<script lang="ts">
  import { BissButton } from 'biss-ui/svelte';

  let saving = $state(false);
  let saved = $state(0);

  async function save() {
    saving = true;
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Your request goes here.
    saving = false;
    saved++;
  }
</script>

<BissButton loading={saving} onclick={save}>Save changes</BissButton>
<span role="status" style="color: var(--biss-muted)">{saved ? `Saved ${saved}×` : 'Not saved yet'}</span>
