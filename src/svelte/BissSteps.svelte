<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  /**
   * Container for BissStep. An ordered list, because the steps are ordered —
   * screen readers should say "3 items" and number them without help.
   */
</script>

<ol class="biss-steps">
  {@render children?.()}
</ol>
