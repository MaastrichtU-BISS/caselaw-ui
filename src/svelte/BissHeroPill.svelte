<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  /* Deliberately empty: a Svelte file with no script block publishes without a
	   type declaration, so consumers typechecking against the package get
	   "implicitly has an any type" for it. */
</script>

<span class="biss-hero-pill">{@render children?.()}</span>
