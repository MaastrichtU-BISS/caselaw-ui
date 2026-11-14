<script lang="ts">
  import { BissSelectPicker, type BissPickOption } from 'biss-ui/svelte';

  let stage = $state('review');
  const stages: BissPickOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'Internal review' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'awarded', label: 'Awarded', disabled: true, description: 'Set by the grants office' },
  ];
</script>

<BissSelectPicker
  label="Proposal stage"
  options={stages}
  value={stage}
  searchable={false}
  width={240}
  onchange={(value) => (stage = value)}
/>
