<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissMeterItem } from '../core/types';
  let { items }: { items: BissMeterItem[] } = $props();
  let max = $derived(Math.max(1, ...items.map((i) => i.value)));
</script>

<div>
  {#each items as item}<div class="biss-meter-row">
      <div class="biss-meter-head">
        <span class="biss-meter-name">{item.label}</span><span class="biss-meter-value"
          >{item.display ?? item.value}</span
        >
      </div>
      <div class="biss-meter-track">
        <div
          class="biss-meter-fill"
          style:width={(Math.max(0, item.value) / max) * 100 + '%'}
        ></div>
      </div>
    </div>{/each}
</div>
