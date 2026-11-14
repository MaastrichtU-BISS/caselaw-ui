<script lang="ts">
  import { BissSelectPicker, type BissPickOption } from 'biss-ui/svelte';

  let lead = $state('anouk');
  const people: BissPickOption[] = [
    { value: 'anouk', label: 'Anouk van den Berg', description: 'Associate professor, European law' },
    { value: 'marco', label: 'Marco Rossi', description: 'Postdoctoral researcher' },
    { value: 'lea', label: 'Léa Dubois', description: 'PhD candidate, legal informatics' },
    { value: 'jonas', label: 'Jonas Becker', description: 'Research software engineer' },
    { value: 'priya', label: 'Priya Nair', description: 'Data steward' },
  ];
</script>

<BissSelectPicker
  label="Project lead"
  options={people}
  value={lead}
  searchLabel="Search people"
  onchange={(value) => (lead = value)}
/>
