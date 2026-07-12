import { createFileRoute } from "@tanstack/react-router";
import { createPrxClient } from "@/lib/prescribe-rx/client";
import type { PrxEncounterTypeSchema } from "@/lib/prescribe-rx/encounter-schema";
import { isPrxSandbox } from "@/lib/prescribe-rx/env";
import { PrxApiError } from "@/lib/prescribe-rx/types";
import {
  extractEncounterId,
  extractEncounterNumber,
  extractPatientChartId,
  extractPatientNumber,
} from "@/server/prx/extract";
import { buildIntakeFromSchema } from "@/server/prx/schema-intake";
import {
  getIdempotencyKey,
  handlePrxRouteError,
  jsonError,
  jsonOk,
  readJsonBody,
} from "@/server/prx/respond";

const UNIFIED_INTAKE_PATH = "/telehealth/intake/unified";

type DynamicIntakeBody = {
  encounterTypeId: string;
  answers: Record<string, unknown>;
};

/**
 * Submit the dynamic quiz's slug-keyed answers to PrescribeRx.
 * The schema is fetched server-side (so `maps_to` routing and the encounter-type
 * slug are trusted), the payload is assembled, then POSTed to unified intake.
 */
export const Route = createFileRoute("/api/prx/intake-dynamic")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await readJsonBody<DynamicIntakeBody>(request);
          if (!body?.encounterTypeId || !body?.answers) {
            return jsonError("Missing encounterTypeId or answers", 400);
          }

          const prx = createPrxClient();

          const schemaEnvelope = await prx.get<{ data: PrxEncounterTypeSchema }>(
            `/telehealth/encounter-types/${encodeURIComponent(body.encounterTypeId)}/schema`,
          );
          const schema = schemaEnvelope.data;
          if (!schema?.encounter_type?.slug) {
            return jsonError("Could not load encounter type schema", 502);
          }

          const payload = buildIntakeFromSchema(schema, body.answers, {
            sandbox: isPrxSandbox(),
          });

          const idempotencyKey = getIdempotencyKey(request) ?? crypto.randomUUID();

          let intake: unknown;
          try {
            intake = await prx.post(UNIFIED_INTAKE_PATH, payload, {
              headers: { "Idempotency-Key": idempotencyKey },
            });
          } catch (error) {
            if (error instanceof PrxApiError) {
              const prxMessage =
                typeof error.body === "object" &&
                error.body != null &&
                "message" in error.body &&
                typeof (error.body as { message: unknown }).message === "string"
                  ? (error.body as { message: string }).message
                  : undefined;
              return jsonError(
                prxMessage ?? "Failed to submit intake to PrescribeRx",
                error.status,
                error.body,
              );
            }
            throw error;
          }

          return jsonOk(
            {
              intake,
              encounterId: extractEncounterId(intake),
              encounterNumber: extractEncounterNumber(intake),
              patientNumber: extractPatientNumber(intake),
              patientChartId: extractPatientChartId(intake),
              idempotencyKey,
            },
            { status: 201 },
          );
        } catch (error) {
          return handlePrxRouteError(error);
        }
      },
    },
  },
});
