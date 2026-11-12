<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  let {
    modelValue = $bindable(''),
    invalid = false,
    onchange,
    ...rest
  }: Omit<HTMLTextareaAttributes, 'onchange'> & {
    modelValue?: string;
    invalid?: boolean;
    onchange?: (value: string) => void;
  } = $props();
</script>

<textarea
  {...rest}
  class="biss-textarea"
  aria-invalid={invalid || undefined}
  value={modelValue}
  oninput={(e) => {
    modelValue = e.currentTarget.value;
    onchange?.(modelValue);
    rest.oninput?.(e);
  }}></textarea>
