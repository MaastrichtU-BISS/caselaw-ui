<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissPickOption } from '../core/types';
  let {
    options,
    selected = $bindable([]),
    label,
    onchange,
  }: {
    options: BissPickOption[];
    selected?: string[];
    label: string;
    onchange?: (value: string[]) => void;
  } = $props();
  type Events = { change: [value: string[]] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<div class="biss-onboarding-chips" role="group" aria-label={label}>
  {#each options as o (o.value)}<button
      type="button"
      disabled={o.disabled}
      aria-pressed={selected.includes(o.value)}
      onclick={() => {
        selected = selected.includes(o.value)
          ? selected.filter((v) => v !== o.value)
          : [...selected, o.value];
        emit('change', selected);
      }}>{o.label}</button
    >{/each}
</div>
