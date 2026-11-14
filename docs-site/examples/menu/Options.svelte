<script lang="ts">
  import { BissMenu, type BissMenuItem } from 'biss-ui/svelte';

  let showArchived = $state(false);
  let compact = $state(true);
  let groupBy = $state('status');

  const groups = [
    { key: 'status', label: 'Status' },
    { key: 'owner', label: 'Owner' },
    { key: 'funder', label: 'Funder' },
  ];

  let items = $derived<BissMenuItem[]>([
    { key: 'archived', label: 'Show archived projects', checked: showArchived },
    { key: 'compact', label: 'Compact rows', checked: compact },
    {
      key: 'group',
      label: 'Group by',
      description: groups.find((group) => group.key === groupBy)?.label,
      separator: true,
      children: groups.map((group) => ({ ...group, checked: group.key === groupBy })),
    },
  ]);

  function pick(item: BissMenuItem) {
    if (item.key === 'archived') showArchived = !showArchived;
    else if (item.key === 'compact') compact = !compact;
    else groupBy = item.key;
  }
</script>

<BissMenu label="View options" {items} onpick={pick} />
