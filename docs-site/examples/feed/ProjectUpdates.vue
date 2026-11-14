<script setup lang="ts">
import { ref } from 'vue';
import { BissFeed, toggleReaction, type BissFeedUpdate } from 'biss-ui/vue';

const items = ref<BissFeedUpdate[]>([
  {
    id: 'u1',
    author: 'Ada Lovelace',
    time: '2 h ago',
    datetime: '2026-11-14T09:12:00Z',
    title: 'Ethics approval received',
    body: 'The committee approved the interview protocol without changes. Fieldwork can start on 1 December.',
    pinned: true,
    attachments: [{ id: 'f1', name: 'Approval letter.pdf', size: '182 KB', type: 'PDF', href: '#' }],
    reactions: [{ emoji: '🎉', count: 4, reacted: true, people: 'You, Grace Hopper and 2 others' }],
    comments: 3,
  },
  {
    id: 'u2',
    author: 'Grace Hopper',
    time: 'Yesterday',
    datetime: '2026-11-13T15:40:00Z',
    body: 'The Open Science call closes in six weeks. I drafted the data management section; comments welcome.',
    links: [
      {
        url: 'https://www.nwo.nl/en/calls/open-science-fund',
        title: 'Open Science Fund 2026',
        description: 'Funding for projects that make research more open, transparent and reproducible.',
        site: 'NWO',
      },
    ],
    reactions: [{ emoji: '👀', count: 1, people: 'Alan Turing' }],
  },
]);
const actions = [
  { key: 'pin', label: 'Pin to top', icon: 'pin' as const },
  { key: 'copy', label: 'Copy link', icon: 'link' as const },
  { key: 'delete', label: 'Delete', icon: 'trash' as const, danger: true },
];
const status = ref('');

function post(text: string) {
  // Save the update, then add the stored version.
  items.value = [{ id: 'u' + Date.now(), author: 'You', time: 'Just now', body: text }, ...items.value];
}
function react({ id, emoji }: { id: string; emoji: string }) {
  items.value = items.value.map((u) =>
    u.id === id ? { ...u, reactions: toggleReaction(u.reactions ?? [], emoji) } : u,
  );
}
</script>

<template>
  <BissFeed
    :items="items"
    :actions="actions"
    has-more
    @post="post"
    @react="react"
    @comment="status = 'Open the replies here.'"
    @action="status = `Chose ${$event.key}`"
    @more="status = 'Load older updates here.'"
  />
  <p role="status" class="example-status">{{ status }}</p>
</template>

<style scoped>
.example-status {
  min-height: 1.5em;
  margin: 8px 0 0;
  color: var(--biss-muted);
  font-size: 13px;
}
</style>
