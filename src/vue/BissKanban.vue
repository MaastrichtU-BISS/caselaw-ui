<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../icon-names';
import BissAvatar from './BissAvatar.vue';
import BissSelectPicker from './BissSelectPicker.vue';
import type { BissBoardLane, BissBoardCard } from '../library-types';
const {
  lanes,
  cards,
  label,
  readonly = false,
  addLabel = 'Add item',
  moveLabel = 'Move to lane',
} = defineProps<{
  lanes: BissBoardLane[];
  cards: BissBoardCard[];
  label: string;
  readonly?: boolean;
  addLabel?: string;
  moveLabel?: string;
}>();
const emit = defineEmits<{
  open: [id: string];
  move: [value: { id: string; lane: string }];
  add: [lane: string];
}>();
function drag(e: DragEvent, id: string) {
  e.dataTransfer?.setData('application/x-biss-card', id);
}
function drop(e: DragEvent, lane: string) {
  if (readonly) return;
  const id = e.dataTransfer?.getData('application/x-biss-card');
  if (id && cards.some((c) => c.id === id)) emit('move', { id, lane });
}
</script>
<template>
  <div class="biss-kanban" role="group" :aria-label="label">
    <section
      v-for="lane in lanes"
      :key="lane.id"
      class="biss-kanban-lane"
      @dragover.prevent
      @drop.prevent="drop($event, lane.id)"
    >
      <header>
        <i class="biss-color-dot" :style="{ background: lane.color ?? 'var(--biss-primary)' }" />
        <h3>{{ lane.label }}</h3>
        <small>{{ cards.filter((c) => c.lane === lane.id).length }}</small>
      </header>
      <article
        v-for="card in cards.filter((c) => c.lane === lane.id)"
        :key="card.id"
        :draggable="!readonly"
        @dragstart="drag($event, card.id)"
      >
        <button type="button" class="biss-kanban-title" @click="emit('open', card.id)">
          {{ card.title }}
        </button>
        <p v-if="card.description">{{ card.description }}</p>
        <footer>
          <BissAvatar v-if="card.owner" :name="card.owner" :size="20" /><small>{{
            card.due
          }}</small>
        </footer>
        <BissSelectPicker
          v-if="!readonly"
          :label="moveLabel + ' ' + card.title"
          :value="lane.id"
          :options="lanes.map((l) => ({ value: l.id, label: l.label }))"
          @change="emit('move', { id: card.id, lane: $event })"
        />
      </article>
      <button v-if="!readonly" type="button" class="biss-table-add" @click="emit('add', lane.id)">
        <BissIcon name="plus" />{{ addLabel }}
      </button>
    </section>
  </div>
</template>
