<script lang="ts">
  import { BissFeed, BissSegmentedControl } from 'biss-ui/svelte';

  let shown = $state('loading');
  const options = [
    { value: 'loading', label: 'Loading' },
    { value: 'empty', label: 'Empty' },
    { value: 'error', label: 'Failed' },
  ];
</script>

<div class="example-states">
  <BissSegmentedControl label="Feed state" {options} value={shown} onchange={(value) => (shown = value)} />
  <BissFeed
    items={[]}
    composer={false}
    loading={shown === 'loading'}
    error={shown === 'error' ? 'Updates could not be loaded.' : undefined}
    onretry={() => (shown = 'loading')}
  />
</div>

<style>
  .example-states {
    display: grid;
    gap: 16px;
    justify-items: start;
  }
</style>
