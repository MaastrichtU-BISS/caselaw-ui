<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissPopover from './BissPopover.svelte';
  let {
    title,
    paragraphs,
    href = undefined,
    linkLabel = 'View records',
  }: {
    title: string;
    paragraphs: string[];
    href?: string | undefined;
    linkLabel?: string;
  } = $props();
</script>

<BissPopover label={title} width={300}
  ><div class="biss-figure-help">
    <b>{title}</b>{#each paragraphs as paragraph}<p>{paragraph}</p>{/each}{#if href}<a {href}
        >{linkLabel}</a
      >{/if}
  </div></BissPopover
>
