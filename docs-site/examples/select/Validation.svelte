<script lang="ts">
  import { BissButton, BissField, BissSelect } from 'biss-ui/svelte';

  let licence = $state('');
  let error = $state('');
  const licences = [
    { value: 'cc-by', label: 'CC BY 4.0' },
    { value: 'cc-by-nc', label: 'CC BY-NC 4.0' },
    { value: 'cc0', label: 'CC0 (public domain)' },
    { value: 'restricted', label: 'Restricted access' },
  ];

  function publish(event: SubmitEvent) {
    event.preventDefault();
    error = licence ? '' : 'Choose a licence before publishing the dataset.';
  }
</script>

<form
  novalidate
  class="biss-stack biss-stack-sm"
  style="width: min(100%, 22rem)"
  onsubmit={publish}
>
  <BissField label="Dataset licence" {error} required>
    <BissSelect bind:value={licence} options={licences} placeholder="Choose a licence" />
  </BissField>
  <div>
    <BissButton type="submit">Publish dataset</BissButton>
  </div>
</form>
