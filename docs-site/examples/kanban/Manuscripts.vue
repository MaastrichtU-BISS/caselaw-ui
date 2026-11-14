<script setup lang="ts">
import { ref } from 'vue';
import { BissKanban, type BissBoardCard, type BissBoardLane } from 'biss-ui/vue';

const lanes: BissBoardLane[] = [
  { id: 'drafting', label: 'Drafting', color: '#A8A49C' },
  { id: 'review', label: 'Internal review', color: '#E8A900' },
  { id: 'submitted', label: 'Submitted', color: '#005CA9' },
  { id: 'accepted', label: 'Accepted', color: '#0F7A4E' },
];

const cards = ref<BissBoardCard[]>([
  { id: 'm1', lane: 'drafting', title: 'Judicial dissent in the CJEU', owner: 'Lena Vos', due: '28 Nov' },
  { id: 'm2', lane: 'review', title: 'Citation graphs of Dutch case law', description: 'Second reader: Marco', owner: 'Aisha Bakker', due: '2 Dec' },
  { id: 'm3', lane: 'submitted', title: 'Measuring legal uncertainty', owner: 'Tom Jansen', due: 'Sent 4 Nov' },
  { id: 'm4', lane: 'accepted', title: 'Open access to court records', owner: 'Sofie Peeters', due: 'In press' },
]);
let next = 5;

function move({ id, lane }: { id: string; lane: string }) {
  cards.value = cards.value.map((card) => (card.id === id ? { ...card, lane } : card));
}

function add(lane: string) {
  cards.value = [...cards.value, { id: `m${next++}`, lane, title: 'Untitled manuscript' }];
}
</script>

<template>
  <BissKanban
    label="Manuscripts"
    :lanes="lanes"
    :cards="cards"
    add-label="Add manuscript"
    @move="move"
    @add="add"
  />
</template>
