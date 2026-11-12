<script setup lang="ts">
import { ref } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import { moveItem } from '../core/collections';
const {
  items,
  label = 'Meeting agenda',
  readonly = false,
  addLabel = 'Add agenda item',
  completeLabel = 'Covered',
  moveUpLabel = 'Move earlier',
  moveDownLabel = 'Move later',
} = defineProps<{
  items: { id: string; title: string; minutes?: number; done: boolean }[];
  label?: string;
  readonly?: boolean;
  addLabel?: string;
  completeLabel?: string;
  moveUpLabel?: string;
  moveDownLabel?: string;
}>();
const emit = defineEmits<{
  change: [items: { id: string; title: string; minutes?: number; done: boolean }[]];
  add: [title: string];
}>();
const draft = ref('');
</script>
<template>
  <section class="biss-agenda" :aria-label="label">
    <h3>{{ label }}</h3>
    <ol>
      <li v-for="(item, i) in items" :key="item.id">
        <input
          type="checkbox"
          :checked="item.done"
          :disabled="readonly"
          :aria-label="completeLabel + ' ' + item.title"
          @change="
            emit(
              'change',
              items.map((v) => (v.id === item.id ? { ...v, done: !v.done } : v)),
            )
          "
        /><span>{{ item.title }}</span
        ><small v-if="item.minutes">{{ item.minutes }} min</small
        ><button
          v-if="!readonly"
          type="button"
          class="biss-header-action"
          :aria-label="moveUpLabel + ' ' + item.title"
          :disabled="i === 0"
          @click="emit('change', moveItem(items, i, -1))"
        >
          <BissIcon name="arrowUp" /></button
        ><button
          v-if="!readonly"
          type="button"
          class="biss-header-action"
          :aria-label="moveDownLabel + ' ' + item.title"
          :disabled="i === items.length - 1"
          @click="emit('change', moveItem(items, i, 1))"
        >
          <BissIcon name="arrowDown" />
        </button>
      </li>
    </ol>
    <form v-if="!readonly" @submit.prevent="draft.trim() && emit('add', draft.trim())">
      <input
        class="biss-input"
        v-model="draft"
        :aria-label="addLabel"
        :placeholder="addLabel"
      /><button type="submit" class="biss-text-button" :disabled="!draft.trim()">
        {{ addLabel }}
      </button>
    </form>
  </section>
</template>
