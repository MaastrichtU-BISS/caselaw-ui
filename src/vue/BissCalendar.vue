<script setup lang="ts">
import { computed } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import { monthGrid } from '../core/date';
import type { BissCalendarItem } from '../core/types';
const {
  month,
  items,
  label,
  locale = 'en-GB',
  readonly = false,
  addLabel = 'Add on',
} = defineProps<{
  month: string;
  items: BissCalendarItem[];
  label: string;
  locale?: string;
  readonly?: boolean;
  addLabel?: string;
}>();
const emit = defineEmits<{ open: [id: string]; add: [day: string] }>();
const days = computed(() => monthGrid(Number(month.slice(0, 4)), Number(month.slice(5, 7))).flat());
const format = (d: string) =>
  new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric' }).format(
    new Date(d + 'T12:00:00Z'),
  );
</script>
<template>
  <div class="biss-calendar" role="group" :aria-label="label">
    <section v-for="cell in days" :key="cell.day" :data-out="cell.out">
      <header>
        <time :datetime="cell.day">{{ format(cell.day) }}</time><button
          v-if="!readonly"
          type="button"
          class="biss-header-action"
          :aria-label="addLabel + ' ' + cell.day"
          @click="emit('add', cell.day)"
        >
          <BissIcon name="plus" />
        </button>
      </header>
      <button
        v-for="item in items.filter((i) => i.day === cell.day)"
        :key="item.id"
        type="button"
        class="biss-calendar-item"
        :style="{ color: item.color }"
        @click="emit('open', item.id)"
      >
        {{ item.title }}
      </button>
    </section>
  </div>
</template>
