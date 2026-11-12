<script lang="ts">
  interface Props {
    heading?: 'h1' | 'h2' | 'h3';
    title: string;
    description?: string | undefined;
    meta?: string | undefined;
    lead?: import('svelte').Snippet;
    actions?: import('svelte').Snippet;
    tabs?: import('svelte').Snippet;
  }

  let {
    heading = 'h1',
    title,
    description = undefined,
    meta = undefined,
    lead,
    actions,
    tabs,
  }: Props = $props();
</script>

<header class="biss-pagebar">
  <div class="biss-pagebar-row">
    {@render lead?.()}
    <svelte:element this={heading}>{title}</svelte:element>
    <span class="biss-muted">{meta ?? ''}</span>
    <div class="biss-pagebar-actions">{@render actions?.()}</div>
  </div>
  {#if description}<p>{description}</p>{/if}{@render tabs?.()}
</header>
