/** Unwrap PRX envelopes: `{ success, data }` and optional nested `data.data`. */
export function unwrapPrxEntity(payload: unknown): Record<string, unknown> | null {
  if (payload == null || typeof payload !== "object") return null;

  let current: unknown = payload;
  for (let depth = 0; depth < 3; depth += 1) {
    if (current == null || typeof current !== "object") return null;
    const record = current as Record<string, unknown>;

    if (
      "patient_chart_id" in record ||
      "encounter_number" in record ||
      "id" in record ||
      "order_number" in record
    ) {
      return record;
    }

    if ("data" in record && record.data != null) {
      current = record.data;
      continue;
    }

    return record;
  }

  return null;
}

export function extractPatientChartId(patient: unknown): string | undefined {
  const record = unwrapPrxEntity(patient);
  if (!record) return undefined;

  const chartId = record.patient_chart_id ?? record.chart_id ?? record.id;
  return typeof chartId === "string" ? chartId : undefined;
}

export function extractOrderId(order: unknown): string | undefined {
  const record = unwrapPrxEntity(order);
  if (!record) return undefined;
  const id = record.id ?? record.order_id;
  return typeof id === "string" ? id : undefined;
}

export function extractEncounterId(intake: unknown): string | undefined {
  const record = unwrapPrxEntity(intake);
  if (!record) return undefined;
  const id = record.encounter_id ?? record.id;
  return typeof id === "string" ? id : undefined;
}

export function extractEncounterNumber(intake: unknown): string | undefined {
  const record = unwrapPrxEntity(intake);
  if (!record) return undefined;
  const number = record.encounter_number;
  return typeof number === "string" ? number : undefined;
}

export function extractPatientNumber(intake: unknown): string | undefined {
  const record = unwrapPrxEntity(intake);
  if (!record) return undefined;
  const number = record.patient_number;
  return typeof number === "string" ? number : undefined;
}
