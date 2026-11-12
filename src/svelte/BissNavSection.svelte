<script lang="ts">
  interface Props {
    heading?: string | undefined;
    empty?: string | undefined;
    action?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let { heading = undefined, empty = undefined, action, children }: Props = $props();
</script>

<nav class="biss-nav-section" aria-label={heading}>
  {#if heading}
    <div class="biss-nav-heading">
      <span>{heading}</span>
      {@render action?.()}
    </div>
  {/if}
  {@render children?.()}
  {#if empty}
    <p class="biss-nav-empty">{empty}</p>
  {/if}
</nav>
