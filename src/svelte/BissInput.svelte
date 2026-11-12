<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  let {
    modelValue = $bindable<string | number | null>(null),
    invalid = false,
    mono = false,
    onchange,
    ...rest
  }: Omit<HTMLInputAttributes, 'onchange'> & {
    modelValue?: string | number | null;
    invalid?: boolean;
    mono?: boolean;
    onchange?: (value: string | number | null) => void;
  } = $props();
</script>

<input
  {...rest}
  class="biss-input"
  class:biss-input-invalid={invalid}
  class:biss-input-mono={mono}
  aria-invalid={invalid || undefined}
  value={modelValue ?? ''}
  oninput={(e) => {
    modelValue = e.currentTarget.value;
    onchange?.(modelValue);
    rest.oninput?.(e);
  }}
/>
