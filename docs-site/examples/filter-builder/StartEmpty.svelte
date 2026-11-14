<script lang="ts">
  import { BissFilterBuilder, type BissFilterField, type BissFilterRule } from 'biss-ui/svelte';

  const fields: BissFilterField[] = [
    { key: 'team', label: 'Team', operators: [{ value: 'is', label: 'is' }] },
    { key: 'deadline', label: 'Deadline', operators: [{ value: 'before', label: 'before' }, { value: 'after', label: 'after' }] },
  ];

  let rules = $state<BissFilterRule[]>([]);
  let match = $state<'all' | 'any'>('any');
</script>

<BissFilterBuilder
  label="Task filters"
  {fields}
  {rules}
  {match}
  onchange={(next) => (rules = next)}
  onmatch={(next) => (match = next)}
/>
