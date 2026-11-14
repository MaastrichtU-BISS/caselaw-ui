<script lang="ts">
  import { BissViewTabs } from 'biss-ui/svelte';

  const projects = [
    { name: 'Case law annotation', status: 'active' },
    { name: 'Court data portal', status: 'active' },
    { name: 'Citation network study', status: 'active' },
    { name: 'Legal NLP benchmark', status: 'review' },
    { name: 'Open access monitor', status: 'archived' },
  ];

  let view = $state('active');

  const count = (status: string) => projects.filter((project) => project.status === status).length;
  const views = [
    { key: 'all', label: 'All projects', count: projects.length },
    { key: 'active', label: 'Active', count: count('active') },
    { key: 'review', label: 'In review', count: count('review') },
    { key: 'archived', label: 'Archived', count: count('archived') },
  ];

  let visible = $derived(
    projects.filter((project) => view === 'all' || project.status === view),
  );
</script>

<BissViewTabs bind:value={view} items={views} label="Project views" />
<ul>
  {#each visible as project (project.name)}<li>{project.name}</li>{/each}
</ul>
