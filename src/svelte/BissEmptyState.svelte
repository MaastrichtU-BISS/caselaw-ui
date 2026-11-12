<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    copy,
    children,
  }: {
    title?: string;
    copy?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="biss-empty-state">
  <div>
    {#if title}<p class="biss-empty-title">{title}</p>{/if}
    {#if copy}<p class="biss-empty-copy">{copy}</p>{/if}
    {#if children}{@render children()}{/if}
  </div>
</div>
