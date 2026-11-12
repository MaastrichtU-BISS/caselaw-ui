/** A framework-neutral contract linking a field label, control and supporting text. */
export const BISS_FIELD = Symbol('biss-field');
export interface BissFieldContext {
  readonly id: string;
  readonly describedBy: string | undefined;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly disabled: boolean;
}
export function fieldControl(
  field: BissFieldContext | undefined,
  attrs: Record<string, unknown> = {},
) {
  const descriptions = [attrs['aria-describedby'], field?.describedBy]
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean);
  return {
    id: field?.id ?? (attrs.id as string | undefined),
    'aria-describedby': descriptions.length ? [...new Set(descriptions)].join(' ') : undefined,
    'aria-invalid':
      (attrs['aria-invalid'] as boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined) ??
      (field?.invalid || undefined),
    required: Boolean(attrs.required || field?.required),
    disabled: Boolean(attrs.disabled || field?.disabled),
  };
}
