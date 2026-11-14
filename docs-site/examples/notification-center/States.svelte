<script lang="ts">
  import { BissNotificationCenter, BissSegmentedControl } from 'biss-ui/svelte';

  let shown = $state('empty');
  let open = $state(true);
  const options = [
    { value: 'empty', label: 'Empty' },
    { value: 'loading', label: 'Loading' },
    { value: 'error', label: 'Failed' },
  ];
</script>

<div class="example-states">
  <BissSegmentedControl
    label="Notification state"
    {options}
    value={shown}
    onchange={(value) => {
      shown = value;
      open = true;
    }}
  />
  <BissNotificationCenter
    bind:open
    items={[]}
    loading={shown === 'loading'}
    error={shown === 'error' ? 'Notifications could not be loaded.' : undefined}
    align="center"
    onretry={() => (shown = 'loading')}
  />
</div>

<style>
  .example-states {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: flex-start;
  }
</style>
