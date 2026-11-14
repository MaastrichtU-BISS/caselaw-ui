<script lang="ts">
  import { BissDataGrid, type BissColumn } from 'biss-ui/svelte';

  let columns = $state<BissColumn[]>([
    { key: 'title', label: 'Project', visible: true, width: 240 },
    { key: 'lead', label: 'Lead', visible: true, width: 170 },
    { key: 'deadline', label: 'Report due', visible: true, width: 140 },
  ]);
</script>

<BissDataGrid
  label="Overdue reports"
  rows={[]}
  {columns}
  emptyLabel="No overdue reports. Everything is filed."
  oncolumns={(next) => (columns = next)}
/>
