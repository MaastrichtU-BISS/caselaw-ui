<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
  let {
    id,
    label,
    hint,
    error,
    optional = false,
    optionalLabel = 'optional',
    required = false,
    disabled = false,
    children,
  }: {
    id?: string;
    label?: string;
    hint?: string;
    error?: string;
    optional?: boolean;
    optionalLabel?: string;
    required?: boolean;
    disabled?: boolean;
    children?: Snippet<
      [{ id: string; invalid: boolean; control: ReturnType<typeof fieldControl> }]
    >;
  } = $props();
  const generated = $props.id();
  const field: BissFieldContext = {
    get id() {
      return id ?? generated;
    },
    get describedBy() {
      return error ? field.id + '-error' : hint ? field.id + '-hint' : undefined;
    },
    get invalid() {
      return !!error;
    },
    get required() {
      return required;
    },
    get disabled() {
      return disabled;
    },
  };
  setContext(BISS_FIELD, field);
</script>

<div
  class="biss-field"
  data-disabled={disabled || undefined}
  data-invalid={field.invalid || undefined}
>
  {#if label}<label class="biss-field-label" for={field.id}
      >{label}{#if optional}<span class="biss-field-optional">{optionalLabel}</span
        >{/if}{#if required}<span aria-hidden="true" class="biss-field-required">*</span
        >{/if}</label
    >{/if}{@render children?.({
    id: field.id,
    invalid: field.invalid,
    control: fieldControl(field),
  })}{#if error}<p id={field.id + '-error'} class="biss-field-error" role="alert">
      {error}
    </p>{:else if hint}<p id={field.id + '-hint'} class="biss-field-hint">{hint}</p>{/if}
</div>
