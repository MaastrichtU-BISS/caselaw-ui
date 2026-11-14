<script lang="ts">
  import { BissSegmentedControl } from 'biss-ui/svelte';

  let view = $state('list');
  const views = [
    { value: 'list', label: 'List' },
    { value: 'board', label: 'Board' },
    { value: 'timeline', label: 'Timeline', disabled: true },
  ];
</script>

<BissSegmentedControl label="Show deliverables as" options={views} bind:value={view} />
