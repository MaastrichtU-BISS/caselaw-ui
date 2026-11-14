<script lang="ts">
  import { BissField, BissInput, BissSelect, BissTextarea } from 'biss-ui/svelte';

  let title = $state('Automated citation analysis of EU case law');
  let programme = $state('');
  let summary = $state('');

  const programmes = [
    { value: 'horizon', label: 'Horizon Europe' },
    { value: 'nwo-vidi', label: 'NWO Vidi' },
    { value: 'erc-starting', label: 'ERC Starting Grant' },
  ];
</script>

<form
  class="biss-stack biss-stack-sm"
  style="width: min(100%, 24rem)"
  onsubmit={(event) => event.preventDefault()}
>
  <BissField label="Project title" required>
    <BissInput bind:value={title} />
  </BissField>
  <BissField label="Funding programme" hint="Shown on the public project page.">
    <BissSelect bind:value={programme} options={programmes} placeholder="Choose a programme" />
  </BissField>
  <BissField label="Summary" hint="Two or three sentences for the review committee.">
    <BissTextarea bind:value={summary} rows={3} />
  </BissField>
</form>
