<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    eyebrow,
    title,
    subtitle,
    actions,
    children,
  }: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    actions?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<header class="biss-page-header">
  <div class="biss-page-header-row">
    <div>
      {#if eyebrow}<div class="biss-eyebrow">{eyebrow}</div>{/if}
      <h1 class="biss-page-title">{title}</h1>
      {#if subtitle}<p class="biss-page-subtitle">{subtitle}</p>{/if}
    </div>
    {#if actions}{@render actions()}{/if}
  </div>
  {#if children}{@render children()}{/if}
</header>
