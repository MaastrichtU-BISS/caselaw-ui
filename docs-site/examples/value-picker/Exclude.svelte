<script lang="ts">
  import { BissValuePicker, type BissPickOption } from 'biss-ui/svelte';

  let funders = $state(['industry']);
  let exclude = $state(true);
  const options: BissPickOption[] = [
    { value: 'nwo', label: 'NWO', count: 12 },
    { value: 'erc', label: 'European Research Council', count: 5 },
    { value: 'horizon', label: 'Horizon Europe', count: 9 },
    { value: 'industry', label: 'Industry partners', count: 6 },
    { value: 'internal', label: 'University funds', count: 14 },
  ];

  let summary = $derived(
    funders.length
      ? `Funder ${exclude ? 'is not' : 'is'} ${funders.length} selected`
      : 'No funder filter',
  );
</script>

<div class="biss-stack biss-stack-sm">
  <BissValuePicker
    label="Funder"
    {options}
    bind:selected={funders}
    bind:negate={exclude}
    canNegate
    searchLabel="Search funders"
  />
  <p role="status" style="margin: 0; color: var(--biss-muted)">{summary}</p>
</div>
