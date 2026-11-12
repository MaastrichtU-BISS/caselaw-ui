<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import { formatDay } from '../core/collections';
const {
  items,
  label = 'Upcoming deadlines',
  locale = 'en-GB',
} = defineProps<{
  items: { id: string; title: string; day: string; context?: string; overdue?: boolean }[];
  label?: string;
  locale?: string;
}>();
const emit = defineEmits<{ open: [id: string] }>();
</script>
<template>
  <section class="biss-deadline-list" :aria-label="label">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      :data-overdue="item.overdue"
      @click="emit('open', item.id)"
    >
      <time :datetime="item.day">{{ formatDay(item.day, locale) }}</time
      ><span
        ><b>{{ item.title }}</b
        ><small v-if="item.context">{{ item.context }}</small></span
      ><BissIcon name="chev" />
    </button>
  </section>
</template>
