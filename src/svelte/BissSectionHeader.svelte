<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, copy, actions }: { title: string; copy?: string; actions?: Snippet } = $props();
</script>

<div class="biss-section-header">
  <div>
    <h3 class="biss-section-title">{title}</h3>
    {#if copy}<p class="biss-section-copy">{copy}</p>{/if}
  </div>
  {#if actions}<div class="biss-section-actions">{@render actions()}</div>{/if}
</div>
