<script lang="ts">
  import { BissMenu, type BissMenuItem } from 'biss-ui/svelte';

  const projects: BissMenuItem[] = [
    { key: 'ecli', label: 'ECLI citation network', icon: 'folder' },
    { key: 'gdpr', label: 'GDPR enforcement tracker', icon: 'folder' },
    { key: 'cjeu', label: 'CJEU preliminary references', icon: 'folder' },
    { key: 'asylum', label: 'Asylum appeals dataset', icon: 'folder' },
    { key: 'climate', label: 'Climate litigation review', icon: 'folder' },
    { key: 'tax', label: 'Tax ruling annotations', icon: 'folder' },
  ];
  let destination = $state('GDPR enforcement tracker');
</script>

<BissMenu
  label="Move to project"
  searchable
  searchLabel="Find a project"
  emptyLabel="No project with that name"
  items={projects}
  onpick={(item) => (destination = item.label)}
/>
<p role="status">In {destination}</p>
