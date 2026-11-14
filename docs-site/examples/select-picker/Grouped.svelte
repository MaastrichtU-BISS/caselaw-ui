<script lang="ts">
  import { BissSelectPicker, type BissPickOption } from 'biss-ui/svelte';

  let department = $state('');
  const departments: BissPickOption[] = [
    { value: 'int-eu', label: 'International and European Law', group: 'Faculty of Law' },
    { value: 'private', label: 'Private Law', group: 'Faculty of Law' },
    { value: 'public', label: 'Public Law', group: 'Faculty of Law' },
    { value: 'dke', label: 'Advanced Computing Sciences', group: 'Faculty of Science and Engineering' },
    { value: 'bms', label: 'Biomedical Sciences', group: 'Faculty of Science and Engineering' },
    { value: 'history', label: 'History', group: 'Arts and Social Sciences' },
    { value: 'philosophy', label: 'Philosophy', group: 'Arts and Social Sciences' },
  ];
</script>

<BissSelectPicker
  label="Department"
  options={departments}
  value={department}
  placeholder="Choose a department"
  searchLabel="Search departments"
  width={320}
  onchange={(value) => (department = value)}
/>
