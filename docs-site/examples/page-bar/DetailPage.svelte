<script lang="ts">
  import { BissButton, BissIcon, BissPageBar } from 'biss-ui/svelte';

  let { onback }: { onback?: () => void } = $props();
</script>

<BissPageBar heading="h2" title="EU Citation Networks" meta="Ends 30 Nov 2026">
  {#snippet lead()}
    <BissButton icon size="sm" variant="ghost" aria-label="Back to projects" onclick={onback}>
      <BissIcon name="chevLeft" />
    </BissButton>
  {/snippet}
  {#snippet actions()}
    <BissButton variant="secondary" size="sm"><BissIcon name="link" />Share</BissButton>
    <BissButton size="sm"><BissIcon name="edit" />Edit project</BissButton>
  {/snippet}
</BissPageBar>
