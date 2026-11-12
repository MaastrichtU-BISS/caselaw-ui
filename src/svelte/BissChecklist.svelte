<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    items,
    label,
    onchange,
  }: {
    items: {
      key: string;
      label: string;
      description?: string;
      done: boolean;
      disabled?: boolean;
    }[];
    label: string;
    onchange?: (item: { key: string; done: boolean }) => void;
  } = $props();
  type Events = { change: [item: { key: string; done: boolean }] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<ul class="biss-checklist" aria-label={label}>
  {#each items as item (item.key)}<li>
      <label
        ><input
          type="checkbox"
          checked={item.done}
          disabled={item.disabled}
          onchange={() => emit('change', { key: item.key, done: !item.done })}
        /><span
          >{item.label}{#if item.description}<small>{item.description}</small>{/if}</span
        ></label
      >
    </li>{/each}
</ul>
