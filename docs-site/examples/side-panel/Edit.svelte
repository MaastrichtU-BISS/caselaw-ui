<script lang="ts">
  import { BissButton, BissField, BissInput, BissSidePanel, BissTextarea } from 'biss-ui/svelte';

  let open = $state(false);
  let saving = $state(false);
  let title = $state('Asylum appeals dataset');
  let summary = $state('Decisions of the Dutch Council of State on asylum appeals, 2015–2025.');

  async function save(event: SubmitEvent) {
    event.preventDefault();
    saving = true;
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Your request goes here.
    saving = false;
    open = false;
  }
</script>

<BissButton onclick={() => (open = true)}>Edit project</BissButton>
<BissSidePanel bind:open busy={saving} title="Edit project" width={480}>
  <form id="edit-project" class="biss-stack biss-stack-sm" onsubmit={save}>
    <BissField label="Title" required>
      <BissInput bind:value={title} />
    </BissField>
    <BissField label="Summary" hint="Shown on the public project page.">
      <BissTextarea bind:value={summary} rows={4} />
    </BissField>
  </form>
  {#snippet actions()}
    <BissButton variant="secondary" disabled={saving} onclick={() => (open = false)}>
      Cancel
    </BissButton>
    <BissButton type="submit" form="edit-project" loading={saving}>Save changes</BissButton>
  {/snippet}
</BissSidePanel>
