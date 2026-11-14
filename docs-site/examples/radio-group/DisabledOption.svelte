<script lang="ts">
  import { BissRadioGroup, type BissPickOption } from 'biss-ui/svelte';

  let cadence = $state('quarterly');
  const cadences: BissPickOption[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    {
      value: 'final',
      label: 'Final report only',
      description: 'Not allowed for projects longer than 24 months.',
      disabled: true,
    },
  ];
</script>

<div style="width: min(100%, 26rem)">
  <BissRadioGroup label="Progress reports" options={cadences} bind:value={cadence} />
</div>
