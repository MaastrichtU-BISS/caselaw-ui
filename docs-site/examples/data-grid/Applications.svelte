<script lang="ts">
  import { BissBadge, BissDataGrid, type BissColumn } from 'biss-ui/svelte';

  const tones = { Awarded: 'success', 'In review': 'info', Draft: 'neutral', Rejected: 'danger' } as const;
  const euro = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const rows = [
    { id: 'NWO-2291', title: 'Court reasoning at scale', lead: 'Dr. Lena Vos', funder: 'NWO Vidi', amount: 800000, status: 'Awarded' },
    { id: 'ERC-0412', title: 'Precedent networks in EU law', lead: 'Prof. Marco Rossi', funder: 'ERC Starting', amount: 1500000, status: 'In review' },
    { id: 'UM-1187', title: 'Open data for legal research', lead: 'Dr. Aisha Bakker', funder: 'UM Fund', amount: 45000, status: 'Draft' },
    { id: 'HE-0077', title: 'Citizen access to case law', lead: 'Dr. Tom Jansen', funder: 'Horizon Europe', amount: 2100000, status: 'Rejected' },
    { id: 'NWO-2305', title: 'Annotation tools for jurists', lead: 'Dr. Sofie Peeters', funder: 'NWO Open', amount: 350000, status: 'In review' },
  ];

  let columns = $state<BissColumn[]>([
    { key: 'title', label: 'Project', visible: true, width: 240, pinned: true, locked: true },
    { key: 'lead', label: 'Lead', visible: true, width: 170 },
    { key: 'funder', label: 'Funder', visible: true, width: 150 },
    { key: 'amount', label: 'Amount', visible: true, width: 130 },
    { key: 'status', label: 'Status', visible: true, width: 130 },
    { key: 'id', label: 'Reference', visible: false, width: 120 },
  ]);
  let selected = $state<string[]>([]);
  let sort = $state<{ key: string; direction: 'asc' | 'desc' }>({ key: 'title', direction: 'asc' });
</script>

<BissDataGrid
  label="Grant applications"
  {rows}
  {columns}
  {selected}
  sortKey={sort.key}
  sortDirection={sort.direction}
  oncolumns={(next) => (columns = next)}
  onselect={(ids) => (selected = ids)}
  onsort={(next) => (sort = next)}
>
  {#snippet cell({ column, value })}
    {#if column.key === 'status'}
      <BissBadge tone={tones[value as keyof typeof tones]} dot>{value}</BissBadge>
    {:else if column.key === 'amount'}
      {euro.format(Number(value))}
    {:else}
      {value}
    {/if}
  {/snippet}
</BissDataGrid>
