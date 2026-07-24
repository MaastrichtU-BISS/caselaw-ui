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

<div class="cle-empty-state">
  <div>
    {#if title}<p class="cle-empty-title">{title}</p>{/if}
    {#if copy}<p class="cle-empty-copy">{copy}</p>{/if}
    {#if children}{@render children()}{/if}
  </div>
</div>
