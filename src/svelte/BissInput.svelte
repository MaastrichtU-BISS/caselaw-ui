<script lang="ts">
  import { getContext } from 'svelte';
  import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
  const field = getContext<BissFieldContext | undefined>(BISS_FIELD);
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  let {
    class: className,
    value = $bindable<string | number | null | undefined>(undefined),
    modelValue = $bindable<string | number | null | undefined>(undefined),
    invalid = false,
    mono = false,
    onchange,
    ...rest
  }: Omit<HTMLInputAttributes, 'onchange' | 'value'> & {
    value?: string | number | null;
    modelValue?: string | number | null;
    invalid?: boolean;
    mono?: boolean;
    onchange?: (value: string | number | null) => void;
  } = $props();
</script>

<input
  {...rest}
  {...fieldControl(field, rest)}
  class={['biss-input', className].filter(Boolean).join(' ')}
  class:biss-input-invalid={invalid}
  class:biss-input-mono={mono}
  aria-invalid={invalid || field?.invalid || undefined}
  value={value !== undefined ? value : (modelValue ?? '')}
  oninput={(e) => {
    const next = e.currentTarget.value;
    if (value !== undefined || modelValue === undefined) value = next;
    else modelValue = next;
    onchange?.(next);
    rest.oninput?.(e);
  }}
/>
