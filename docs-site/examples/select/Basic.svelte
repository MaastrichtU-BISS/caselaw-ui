<script lang="ts">
  import { BissField, BissSelect } from 'biss-ui/svelte';

  let faculty = $state('');
  const faculties = [
    { value: 'law', label: 'Faculty of Law' },
    { value: 'fasos', label: 'Arts and Social Sciences' },
    { value: 'sbe', label: 'School of Business and Economics' },
    { value: 'fhml', label: 'Health, Medicine and Life Sciences' },
  ];
</script>

<div style="width: min(100%, 22rem)">
  <BissField
    label="Faculty"
    hint={faculty ? `Budget code prefix: ${faculty.toUpperCase()}` : 'Decides who approves the budget.'}
  >
    <BissSelect bind:value={faculty} options={faculties} placeholder="Choose a faculty" />
  </BissField>
</div>
