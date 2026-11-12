<script lang="ts">
  interface Props {
    label: string;
    children?: import('svelte').Snippet;
    end?: import('svelte').Snippet;
  }

  let { label, children, end }: Props = $props();
</script>

<div class="biss-toolbar" role="group" aria-label={label}>
  {@render children?.()}
  <div class="biss-toolbar-end">{@render end?.()}</div>
</div>
