<script lang="ts">
  import { BissKanban, type BissBoardCard, type BissBoardLane } from 'biss-ui/svelte';

  const lanes: BissBoardLane[] = [
    { id: 'planned', label: 'Planned' },
    { id: 'running', label: 'Running', color: '#E8A900' },
    { id: 'done', label: 'Done', color: '#0F7A4E' },
  ];

  const cards: BissBoardCard[] = [
    { id: 'w1', lane: 'planned', title: 'Ethics approval', owner: 'Lena Vos', due: 'Jan' },
    { id: 'w2', lane: 'running', title: 'Corpus collection', owner: 'Tom Jansen', due: 'Q1' },
    { id: 'w3', lane: 'done', title: 'Data management plan', owner: 'Aisha Bakker', due: 'Oct' },
  ];

  let opened = $state('');

  function open(id: string) {
    opened = cards.find((card) => card.id === id)?.title ?? '';
  }
</script>

<div class="biss-stack biss-stack-sm">
  <BissKanban
    label="Work packages"
    readonly
    {lanes}
    {cards}
    onopen={open}
  />
  <p role="status">{opened ? `Opened ${opened}` : 'Select a card to open it'}</p>
</div>
