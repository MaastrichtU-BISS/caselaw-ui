<script lang="ts">
  import { BissBarChart, type BissChartPoint } from 'biss-ui/svelte';

  // Downloads of the Dutch case law dataset, per month in 2026.
  const downloads: BissChartPoint[] = [
    { label: 'Jan', value: 412 },
    { label: 'Feb', value: 388 },
    { label: 'Mar', value: 530 },
    { label: 'Apr', value: 611 },
    { label: 'May', value: 574 },
    { label: 'Jun', value: 702 },
    { label: 'Jul', value: 455 },
    { label: 'Aug', value: 398 },
    { label: 'Sep', value: 689 },
    { label: 'Oct', value: 824 },
    { label: 'Nov', value: 771 },
    { label: 'Dec', value: 540 },
  ];
</script>

<BissBarChart points={downloads} seriesLabel="Dataset downloads" />
