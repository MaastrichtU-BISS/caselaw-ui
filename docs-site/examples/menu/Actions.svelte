<script lang="ts">
  import { BissMenu, type BissMenuItem } from 'biss-ui/svelte';

  const items: BissMenuItem[] = [
    { key: 'rename', label: 'Rename', icon: 'edit', hint: 'R' },
    { key: 'duplicate', label: 'Duplicate', icon: 'copy' },
    { key: 'share', label: 'Copy link', icon: 'link' },
    { key: 'export', label: 'Export as CSV', icon: 'down', disabled: true },
    { key: 'delete', label: 'Delete project', icon: 'trash', danger: true, separator: true },
  ];
  let last = $state('');
</script>

<BissMenu label="Project actions" {items} onpick={(item) => (last = item.label)} />
<p role="status">{last ? `Chose “${last}”` : 'Nothing chosen yet'}</p>
