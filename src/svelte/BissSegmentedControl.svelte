<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissPickOption } from '../core/types';
  let {
    options,
    value = $bindable(''),
    label,
    onchange,
  }: {
    options: BissPickOption[];
    value?: string;
    label: string;
    onchange?: (value: string) => void;
  } = $props();
  type Events = { change: [value: string] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<div class="biss-segmented" role="group" aria-label={label}>
  {#each options as option (option.value)}<button
      type="button"
      class="biss-segment"
      aria-pressed={value === option.value}
      disabled={option.disabled}
      onclick={() => {
        value = option.value;
        emit('change', value);
      }}>{option.label}</button
    >{/each}
</div>
