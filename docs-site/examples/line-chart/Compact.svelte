<script lang="ts">
  import { BissKpiCard, BissLineChart } from 'biss-ui/svelte';

  // Data access requests per week, last eight weeks.
  const requests = [4, 7, 6, 11, 9, 13, 15, 18];
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)">
  <BissKpiCard label="Data access requests" value="18 this week" note="Up from 4 eight weeks ago" />
  <BissLineChart
    values={requests}
    height={96}
    color="var(--biss-success)"
    label="Data access requests per week, last eight weeks"
  />
</div>
