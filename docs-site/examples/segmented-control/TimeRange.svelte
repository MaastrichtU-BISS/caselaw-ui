<script lang="ts">
  import { BissSegmentedControl } from 'biss-ui/svelte';

  let range = $state('quarter');
  const ranges = [
    { value: 'month', label: 'Month' },
    { value: 'quarter', label: 'Quarter' },
    { value: 'year', label: 'Year' },
  ];
  const spent: Record<string, string> = {
    month: '€18,400',
    quarter: '€52,900',
    year: '€187,300',
  };
</script>

<div class="biss-stack biss-stack-sm" style="align-items: center">
  <BissSegmentedControl label="Reporting period" options={ranges} bind:value={range} />
  <p role="status" style="margin: 0">Spent this {range}: <b>{spent[range]}</b></p>
</div>
