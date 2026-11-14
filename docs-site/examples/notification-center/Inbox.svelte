<script lang="ts">
  import { BissNotificationCenter, type BissNotice } from 'biss-ui/svelte';

  let items = $state<BissNotice[]>([
    { id: 'n1', title: 'Ada Lovelace mentioned you', detail: 'Methods review', meta: 'Open justice · 5 min ago', unread: true, icon: 'at' },
    { id: 'n2', title: 'You were assigned', detail: 'Draft the data management plan', meta: 'Horizon grant · 1 h ago', unread: true, icon: 'user', tone: 'success' },
    { id: 'n3', title: 'Deadline tomorrow', detail: 'Ethics committee submission', meta: 'Public access study · 3 h ago', unread: true, icon: 'clock', tone: 'warning' },
    { id: 'n4', title: 'Grace Hopper shared a document', detail: 'Interview protocol v3', meta: 'Courts and citizens · Yesterday', icon: 'file', tone: 'neutral' },
  ]);
  let open = $state(true);
  let opened = $state('');

  function pick(item: BissNotice) {
    // Navigate to the record here; the host also persists the read state.
    items = items.map((n) => (n.id === item.id ? { ...n, unread: false } : n));
    opened = item.detail ?? item.title;
  }
  function readAll() {
    items = items.map((n) => ({ ...n, unread: false }));
  }
</script>

<header class="example-bar">
  <strong>Research projects</strong>
  <BissNotificationCenter bind:open {items} seeAllHref="#inbox" onpick={pick} onreadall={readAll} />
</header>
<p role="status" class="example-status">
  {opened ? `Opened “${opened}”` : 'Open the bell to see the latest notifications.'}
</p>

<style>
  .example-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--biss-border);
  }
  .example-status {
    color: var(--biss-muted);
    font-size: 13px;
  }
</style>
