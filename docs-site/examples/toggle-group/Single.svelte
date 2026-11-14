<script lang="ts">
  import { BissToggleGroup } from 'biss-ui/svelte';

  let layout = $state('board');
  const items = [
    { value: 'list', label: 'List', icon: 'list' as const },
    { value: 'board', label: 'Board', icon: 'kanban' as const },
    { value: 'timeline', label: 'Timeline', icon: 'gantt' as const },
  ];
</script>

<BissToggleGroup bind:value={layout} {items} label="Layout" />
