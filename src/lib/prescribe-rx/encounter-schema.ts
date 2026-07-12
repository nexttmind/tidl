/**
 * Types for the PrescribeRx encounter-type intake schema.
 *
 * The intake questions (the "quiz") are authored per encounter type in the PRX
 * admin and exposed read-only via:
 *   GET /telehealth/encounter-types                      → list of encounter types
 *   GET /telehealth/encounter-types/{id}/schema          → the full step/field form
 *
 * Answers are submitted keyed by field `slug` in POST /telehealth/intake/unified.
 */

export type PrxEncounterTypeSummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  product_class: string | null;
  product_type: string | null;
  is_featured: boolean;
  requires_labs: boolean;
  interaction_type: string | null;
};

export type PrxEncounterTypesResponse = {
  data: PrxEncounterTypeSummary[];
  meta: { total: number };
};

/** Option for select / radio / toggle / multiselect fields. */
export type PrxFieldOption = {
  label: string;
  value: string;
  /** Toggle-group fields carry paired on/off values. */
  on_value?: string;
  off_value?: string;
};

/**
 * Conditional-visibility rule. The field is only shown when the answer to
 * `depends_on` satisfies `operator` against `show_if` (e.g. only ask "how much
 * alcohol?" when "do you drink?" === "Yes"). Comparison is case-insensitive and
 * matches inside array answers (toggle groups).
 */
export type PrxFieldCondition = {
  show_if: string;
  operator: string;
  depends_on: string;
};

export type PrxSchemaField = {
  /** Key to send back in the `answers` object. */
  slug: string;
  label: string;
  /** Numeric field-type id from PRX (e.g. 16 = Yes/No, 17 = Toggle Group). */
  field_type: number;
  field_type_label: string;
  is_required: boolean;
  help_text: string | null;
  placeholder: string | null;
  validation?: string[];
  /** Present when the answer also flows to a standard chart field. */
  maps_to?: string;
  options?: PrxFieldOption[];
  min?: number;
  max?: number;
  /** True when a given answer can preclude prescribing. */
  has_preclusions?: boolean;
  /** When present, the field is only shown if this condition is met. */
  depends_on?: PrxFieldCondition;
};

export type PrxSchemaStep = {
  step_name: string;
  step_description: string | null;
  /** Numeric step-type id from PRX (1 = form, 2 = Q&A, 3 = product selection, …). */
  step_type: number;
  display_order: number;
  is_required: boolean;
  fields: PrxSchemaField[];
};

export type PrxEncounterTypeSchema = {
  encounter_type: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
  steps: PrxSchemaStep[];
  field_slugs: string[];
  required_slugs: string[];
};

export type PrxEncounterTypeSchemaResponse = {
  data: PrxEncounterTypeSchema;
  meta: {
    total_steps: number;
    total_fields: number;
    usage: string;
  };
};
