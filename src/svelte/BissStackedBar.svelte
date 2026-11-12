<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    items,
    label,
    onpick,
  }: {
    items: { key: string; label: string; value: number; color: string; display?: string }[];
    label: string;
    onpick?: (key: string) => void;
  } = $props();
  type Events = { pick: [key: string] };
  const handlers = {
    get pick() {
      return onpick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-stacked-bar" aria-label={label}>
  <div
    class="biss-stacked-track"
    role="img"
    aria-label={items.map((i) => i.label + ': ' + (i.display ?? i.value)).join(', ')}
  >
    {#each items as item (item.key)}<span
        style:flex={Math.max(0, Number.isFinite(item.value) ? item.value : 0)}
        style:background={item.color}
      ></span>{/each}
  </div>
  <ul>
    {#each items as item (item.key)}<li>
        <button type="button" onclick={() => emit('pick', item.key)}
          ><i class="biss-color-dot" style:background={item.color}></i><span>{item.label}</span><b
            >{item.display ?? item.value}</b
          ></button
        >
      </li>{/each}
  </ul>
</section>
