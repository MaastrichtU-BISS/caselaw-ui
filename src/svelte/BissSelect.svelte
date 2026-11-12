<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { BissOption } from '../core/types';
  let {
    modelValue = $bindable<string | number>(''),
    options,
    onchange,
    ...rest
  }: Omit<HTMLSelectAttributes, 'onchange'> & {
    modelValue?: string | number;
    options: BissOption[];
    onchange?: (value: string | number) => void;
  } = $props();
</script>

<select
  {...rest}
  class="biss-select"
  value={modelValue}
  onchange={(e) => {
    modelValue =
      options.find((o) => String(o.value) === e.currentTarget.value)?.value ??
      e.currentTarget.value;
    onchange?.(modelValue);
  }}
  >{#each options as option}<option value={option.value}>{option.label}</option>{/each}</select
>
