<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissStat } from '../core/types';
  let { items }: { items: BissStat[] } = $props();
</script>

<dl class="biss-stat-list">
  {#each items as item}<div class="biss-stat-row">
      <dt class="biss-stat-label">{item.label}</dt>
      <dd class="biss-stat-value">{item.value}</dd>
    </div>{/each}
</dl>
