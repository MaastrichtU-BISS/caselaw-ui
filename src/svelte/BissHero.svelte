<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissHeroPill from './BissHeroPill.svelte';
  let {
    title,
    subtitle,
    eyebrow,
    pills = [],
    align = 'center',
    actions,
    pillsContent,
    children,
  }: {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    pills?: string[];
    align?: 'center' | 'start';
    actions?: Snippet;
    pillsContent?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<header
  class="biss-hero"
  class:biss-hero-center={align === 'center'}
  class:biss-hero-start={align === 'start'}
>
  {#if pills.length || pillsContent}<div class="biss-hero-pills">
      {#each pills as pill}<BissHeroPill>{pill}</BissHeroPill>{/each}{@render pillsContent?.()}
    </div>{/if}{#if eyebrow}<p class="biss-eyebrow">{eyebrow}</p>{/if}
  <h1 class="biss-hero-title">{title}</h1>
  {#if subtitle}<p class="biss-hero-subtitle">{subtitle}</p>{/if}{#if actions}<div
      class="biss-hero-actions"
    >
      {@render actions()}
    </div>{/if}{@render children?.()}
</header>
