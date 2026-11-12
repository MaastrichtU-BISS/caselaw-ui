<script lang="ts">
  import { getContext } from 'svelte';
  import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
  const field = getContext<BissFieldContext | undefined>(BISS_FIELD);
  import type { Snippet } from 'svelte';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  let {
    class: className,
    value = $bindable<string | undefined>(undefined),
    modelValue = $bindable<string | undefined>(undefined),
    invalid = false,
    mono = false,
    onchange,
    ...rest
  }: Omit<HTMLTextareaAttributes, 'onchange' | 'value'> & {
    value?: string;
    modelValue?: string;
    invalid?: boolean;
    mono?: boolean;
    onchange?: (value: string) => void;
  } = $props();
</script>

<textarea
  {...rest}
  {...fieldControl(field, rest)}
  class={['biss-textarea', className].filter(Boolean).join(' ')}
  aria-invalid={invalid || field?.invalid || undefined}
  value={value !== undefined ? value : (modelValue ?? '')}
  oninput={(e) => {
    const next = e.currentTarget.value;
    if (value !== undefined || modelValue === undefined) value = next;
    else modelValue = next;
    onchange?.(next);
    rest.oninput?.(e);
  }}></textarea>
