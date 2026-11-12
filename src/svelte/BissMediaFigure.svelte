<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    src,
    alt,
    caption = undefined,
    width = undefined,
    height = undefined,
  }: {
    src: string;
    alt: string;
    caption?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
  } = $props();
</script>

<figure class="biss-media-figure">
  <img {src} {alt} {width} {height} loading="lazy" />{#if caption}<figcaption>
      {caption}
    </figcaption>{/if}
</figure>
