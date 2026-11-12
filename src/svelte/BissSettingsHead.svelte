<script lang="ts">
  interface Props {
    title: string;
    help?: string | undefined;
    more?: string | undefined;
    children?: import('svelte').Snippet;
  }

  let { title, help = undefined, more = undefined, children }: Props = $props();
</script>

<div class="biss-settings-head">
  <div>
    <h2>
      {title}
      {#if more}<button type="button" class="biss-help" title={more} aria-label={more}>?</button
        >{/if}
    </h2>
    {#if help}<p>{help}</p>{/if}
  </div>
  {@render children?.()}
</div>
