<script lang="ts">
  import { BissField, BissInput, BissSaveBar } from 'biss-ui/svelte';

  const loaded = { title: 'Digital Legal Studies', acronym: 'DLS' }; // From your API.
  let saved = $state(loaded);
  let draft = $state({ ...loaded });
  let saving = $state(false);

  let dirty = $derived(draft.title !== saved.title || draft.acronym !== saved.acronym);

  async function save() {
    saving = true;
    await new Promise((resolve) => setTimeout(resolve, 900)); // Your request goes here.
    saved = { ...draft };
    saving = false;
  }

  function discard() {
    draft = { ...saved };
  }
</script>

<div class="biss-stack" style="width: min(100%, 30rem)">
  <BissField label="Project title">
    <BissInput bind:value={draft.title} />
  </BissField>
  <BissField label="Acronym" hint="Shown in reports and the project list.">
    <BissInput bind:value={draft.acronym} />
  </BissField>
  <BissSaveBar show={dirty} {saving} saveLabel="Save project" onsave={save} ondiscard={discard} />
</div>
