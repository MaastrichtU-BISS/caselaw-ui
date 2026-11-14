<script lang="ts">
  import { BissField, BissInput } from 'biss-ui/svelte';

  let email = $state('');
  let budget = $state<number | null>(250000);
  let deadline = $state('2027-03-15');
  let doi = $state('10.1093/ijlit/eaad004');
</script>

<div class="biss-form-grid" style="width: min(100%, 34rem)">
  <BissField label="Principal investigator">
    <BissInput bind:value={email} type="email" placeholder="name@university.nl" autocomplete="email" />
  </BissField>
  <BissField label="Requested budget (EUR)">
    <BissInput bind:value={budget} type="number" min="0" step="1000" />
  </BissField>
  <BissField label="Submission deadline">
    <BissInput bind:value={deadline} type="date" />
  </BissField>
  <BissField label="DOI">
    <BissInput bind:value={doi} mono />
  </BissField>
</div>
