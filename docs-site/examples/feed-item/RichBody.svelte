<script lang="ts">
  import { BissFeedItem, toggleReaction, type BissFeedUpdate } from 'biss-ui/svelte';

  let update = $state<BissFeedUpdate>({
    id: 'u3',
    author: 'Katherine Johnson',
    time: 'Monday',
    datetime: '2026-11-09T11:05:00Z',
    title: 'Quarterly budget review',
    edited: true,
    attachments: [
      { id: 'f2', name: 'Budget Q4 2026.xlsx', size: '64 KB', type: 'XLSX', href: '#' },
      { id: 'f3', name: 'Personnel plan.pdf', size: '210 KB', type: 'PDF', href: '#' },
    ],
    reactions: [
      { emoji: '👍', count: 3, people: 'Ada Lovelace, Grace Hopper and Alan Turing' },
      { emoji: '🙏', count: 1, reacted: true, people: 'You' },
    ],
    comments: 5,
  });
  let status = $state('');
</script>

<BissFeedItem
  item={update}
  onreact={({ emoji }) =>
    (update = { ...update, reactions: toggleReaction(update.reactions ?? [], emoji) })}
  oncomment={() => (status = 'Open the five replies here.')}
>
  <p style="margin: 0">
    Spending is <strong>4% under plan</strong>. Two items need a decision before the board meets:
  </p>
  <ul style="margin: 4px 0 0; padding-left: 20px">
    <li>Move the unused travel budget to the transcription contract.</li>
    <li>Extend the research assistant contract by three months.</li>
  </ul>
</BissFeedItem>
<p role="status" style="min-height: 1.5em; margin: 8px 0 0; color: var(--biss-muted); font-size: 13px">
  {status}
</p>
