<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let items: { key: string; label: string; count?: number; disabled?: boolean }[];
  export let value: string;
  export let label: string;
  const dispatch = createEventDispatcher();
</script>

<nav class="biss-view-tabs" aria-label={label}>
  {#each items as item}<button
      type="button"
      disabled={item.disabled}
      aria-pressed={value === item.key}
      on:click={() => {
        value = item.key;
        dispatch('change', value);
      }}
      >{item.label}{#if item.count !== undefined}<small>{item.count}</small>{/if}</button
    >{/each}<slot name="end" />
</nav>
