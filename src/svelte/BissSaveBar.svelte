<script lang="ts">
  interface Props {
    show: boolean;
    saving?: boolean;
    error?: string | undefined;
    note?: string;
    saveLabel?: string;
    discardLabel?: string;
    onsave?: () => void;
    ondiscard?: () => void;
  }

  let {
    show,
    saving = false,
    error = undefined,
    note = 'Unsaved changes',
    saveLabel = 'Save',
    discardLabel = 'Discard',
    onsave,
    ondiscard,
  }: Props = $props();
</script>

{#if show}<div class="biss-savebar" role="region" aria-label={note} aria-busy={saving}>
    <span class="biss-grow" role="status">{error || note}</span><button
      type="button"
      class="biss-button biss-button-ghost"
      disabled={saving}
      onclick={() => ondiscard?.()}>{discardLabel}</button
    ><button type="button" class="biss-button" disabled={saving} onclick={() => onsave?.()}
      >{saveLabel}</button
    >
  </div>{/if}
