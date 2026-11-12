<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissAvatar from './BissAvatar.svelte';
  let {
    items,
    label,
  }: {
    items: { key: string; actor: string; action: string; time: string; detail?: string }[];
    label: string;
  } = $props();
</script>

<ol class="biss-activity-list" aria-label={label}>
  {#each items as item (item.key)}<li>
      <BissAvatar name={item.actor} size={24} />
      <div>
        <b>{item.actor}</b>
        {item.action}{#if item.detail}<p>{item.detail}</p>{/if}<small>{item.time}</small>
      </div>
    </li>{/each}
</ol>
