<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let show: boolean;
  export let saving = false;
  export let error: string | undefined = undefined;
  export let note = 'Unsaved changes';
  export let saveLabel = 'Save';
  export let discardLabel = 'Discard';
  const dispatch = createEventDispatcher();
</script>

{#if show}<div class="biss-savebar" role="region" aria-label={note} aria-busy={saving}>
    <span class="biss-grow" role="status">{error || note}</span><button
      type="button"
      class="biss-button biss-button-ghost"
      disabled={saving}
      on:click={() => dispatch('discard')}>{discardLabel}</button
    ><button type="button" class="biss-button" disabled={saving} on:click={() => dispatch('save')}
      >{saveLabel}</button
    >
  </div>{/if}
