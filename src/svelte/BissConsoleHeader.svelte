<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissCrumb } from '../core/types';
  import BissBreadcrumbs from './BissBreadcrumbs.svelte';
  let {
    title,
    subtitle,
    crumbs = [],
    actions,
    children,
  }: {
    title: string;
    subtitle?: string;
    crumbs?: BissCrumb[];
    actions?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<header>
  {#if crumbs.length}<BissBreadcrumbs items={crumbs} />{/if}
  <div class="biss-console-header">
    <div>
      <h1 class="biss-console-title">{title}</h1>
      {#if subtitle}<p class="biss-console-subtitle">{subtitle}</p>{/if}
    </div>
    {#if actions}<div class="biss-console-header-actions">{@render actions()}</div>{/if}
  </div>
  {@render children?.()}
</header>
