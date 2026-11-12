<script lang="ts">
  interface Props {
    tone?: string;
    label?: string | undefined;
    children?: import('svelte').Snippet;
    actions?: import('svelte').Snippet;
  }

  let { tone = 'info', label = undefined, children, actions }: Props = $props();
</script>

<div class="biss-alert-line" data-tone={tone} role="status" aria-label={label}>
  <span class="biss-status-dot" aria-hidden="true"></span><span class="biss-grow"
    >{@render children?.()}</span
  >{@render actions?.()}
</div>
