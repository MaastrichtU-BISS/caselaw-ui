<script lang="ts">
  import { BissAlertLine, BissButton, BissIcon } from 'biss-ui/svelte';

  let visible = $state(true);
</script>

{#if visible}
  <BissAlertLine>
    You can now export annotations as CSV from the project menu.
    {#snippet actions()}
      <BissButton icon size="sm" variant="ghost" aria-label="Dismiss notice" onclick={() => (visible = false)}>
        <BissIcon name="x" />
      </BissButton>
    {/snippet}
  </BissAlertLine>
{:else}
  <BissButton size="sm" variant="secondary" onclick={() => (visible = true)}>Show notice again</BissButton>
{/if}
