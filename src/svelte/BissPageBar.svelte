<script lang="ts">
  interface Props {
    title: string;
    description?: string | undefined;
    meta?: string | undefined;
    lead?: import('svelte').Snippet;
    actions?: import('svelte').Snippet;
    tabs?: import('svelte').Snippet;
  }

  let { title, description = undefined, meta = undefined, lead, actions, tabs }: Props = $props();
</script>

<header class="biss-pagebar">
  <div class="biss-pagebar-row">
    {@render lead?.()}
    <h1>{title}</h1>
    <span class="biss-muted">{meta ?? ''}</span>
    <div class="biss-pagebar-actions">{@render actions?.()}</div>
  </div>
  {#if description}<p>{description}</p>{/if}{@render tabs?.()}
</header>
