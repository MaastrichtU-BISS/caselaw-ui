<script lang="ts">
  import { BissAlertLine, BissButton } from 'biss-ui/svelte';
</script>

<BissAlertLine tone="warning">
  Quarterly progress reports for 3 projects are due on 30 November.
  {#snippet actions()}
    <BissButton size="sm" variant="ghost">View reports</BissButton>
  {/snippet}
</BissAlertLine>
