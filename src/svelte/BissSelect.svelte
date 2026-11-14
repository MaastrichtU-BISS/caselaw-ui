<script lang="ts">
  import { getContext } from 'svelte';
  import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
  const field = getContext<BissFieldContext | undefined>(BISS_FIELD);
  import type { Snippet } from 'svelte';
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { BissOption } from '../core/types';
  let {
    class: className,
    value = $bindable<string | number | undefined>(undefined),
    modelValue = $bindable<string | number | undefined>(undefined),
    options,
    placeholder,
    invalid = false,
    onchange,
    ...rest
  }: Omit<HTMLSelectAttributes, 'onchange' | 'value'> & {
    value?: string | number;
    modelValue?: string | number;
    options: BissOption[];
    placeholder?: string;
    invalid?: boolean;
    onchange?: (value: string | number) => void;
  } = $props();
</script>

<select
  {...rest}
  {...fieldControl(field, rest)}
  class={['biss-select', className].filter(Boolean).join(' ')}
  class:biss-input-invalid={invalid}
  aria-invalid={invalid || field?.invalid || undefined}
  value={value !== undefined ? value : (modelValue ?? '')}
  onchange={(e) => {
    const next =
      options.find((o) => String(o.value) === e.currentTarget.value)?.value ??
      e.currentTarget.value;
    if (value !== undefined || modelValue === undefined) value = next;
    else modelValue = next;
    onchange?.(next);
  }}
  >{#if placeholder}<option disabled value="">{placeholder}</option>{/if}{#each options as option}<option value={option.value}>{option.label}</option>{/each}</select
>
