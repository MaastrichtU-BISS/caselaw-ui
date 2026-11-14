<script lang="ts">
  import { BissColumnManager, BissPopover, type BissColumn } from 'biss-ui/svelte';

  let columns = $state<BissColumn[]>([
    { key: 'name', label: 'Name', visible: true, locked: true },
    { key: 'team', label: 'Team', visible: true },
    { key: 'role', label: 'Role', visible: true },
    { key: 'contract', label: 'Contract ends', visible: false },
  ]);
</script>

<BissPopover label="Columns" width={480}>
  <BissColumnManager label="Staff columns" {columns} onchange={(next) => (columns = next)} />
</BissPopover>
