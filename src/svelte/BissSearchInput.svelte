<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import BissIcon from './BissIcon.svelte';
  let {
    modelValue = $bindable(''),
    placeholder = 'Search…',
    onchange,
    ...rest
  }: Omit<HTMLInputAttributes, 'onchange'> & {
    modelValue?: string;
    onchange?: (value: string) => void;
  } = $props();
</script>

<span class="biss-search"
  ><span class="biss-search-icon"><BissIcon name="search" /></span><input
    {...rest}
    type="search"
    class="biss-input"
    {placeholder}
    value={modelValue}
    oninput={(e) => {
      modelValue = e.currentTarget.value;
      onchange?.(modelValue);
      rest.oninput?.(e);
    }}
  /></span
>
