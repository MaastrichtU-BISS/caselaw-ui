<script lang="ts">
  import { BissBarChart, type BissChartPoint } from 'biss-ui/svelte';

  // Ethics review submissions per week, and how many were returned for changes.
  const weeks: BissChartPoint[] = [
    { label: '1 Sep', value: 14, compare: 3 },
    { label: '8 Sep', value: 22, compare: 5 },
    { label: '15 Sep', value: 18, compare: 2 },
    { label: '22 Sep', value: 31, compare: 9 },
    { label: '29 Sep', value: 27, compare: 4 },
    { label: '6 Oct', value: 19, compare: 3 },
    { label: '13 Oct', value: 24, compare: 6 },
    { label: '20 Oct', value: 35, compare: 8 },
    { label: '27 Oct', value: 29, compare: 5 },
    { label: '3 Nov', value: 21, compare: 2 },
  ];
</script>

<BissBarChart points={weeks} seriesLabel="Submitted" compareLabel="Returned for changes" />
