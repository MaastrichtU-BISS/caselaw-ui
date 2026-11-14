<script lang="ts">
  import { BissField, BissSelect } from 'biss-ui/svelte';

  let currency = $state('eur');
  const currencies = [
    { value: 'eur', label: 'Euro (EUR)' },
    { value: 'gbp', label: 'Pound sterling (GBP)' },
    { value: 'chf', label: 'Swiss franc (CHF)' },
  ];
</script>

<div style="width: min(100%, 22rem)">
  <BissField label="Reporting currency" hint="Set by the Horizon Europe programme." disabled>
    <BissSelect bind:value={currency} options={currencies} />
  </BissField>
</div>
