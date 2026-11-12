<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import {
  isPickDay,
  dayPlus,
  addMonths,
  keyStep,
  monthGrid,
  parseDay,
  startOfMonth,
  todayDay,
} from '../core/date';

const {
  value = null,
  range = false,
  start = null,
  end = null,
  min = undefined,
  max = undefined,
  label = 'Choose date',
  locale = 'en-GB',
  today = todayDay(),
  previousLabel = 'Previous month',
  nextLabel = 'Next month',
  clearLabel = 'Clear',
  todayLabel = 'Today',
  typeLabel = 'Type a date',
  invalidLabel = 'Enter a valid date',
} = defineProps<{
  value?: string | null;
  range?: boolean;
  start?: string | null;
  end?: string | null;
  min?: string | undefined;
  max?: string | undefined;
  label?: string;
  locale?: string;
  today?: string;
  previousLabel?: string;
  nextLabel?: string;
  clearLabel?: string;
  todayLabel?: string;
  typeLabel?: string;
  invalidLabel?: string;
}>();
const emit = defineEmits<{
  change: [value: string | null];
  range: [value: { start: string | null; end: string | null }];
}>();
const focusDay = ref(
  isPickDay(value) ? value : isPickDay(start) ? start : isPickDay(today) ? today : todayDay(),
);
const view = ref(startOfMonth(focusDay.value));
const typed = ref('');
const gridEl = ref<HTMLElement | null>(null);
const parsed = computed(() => parseDay(typed.value, today));
const grid = computed(() =>
  monthGrid(Number(view.value.slice(0, 4)), Number(view.value.slice(5, 7))),
);
const format = (d: string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, { ...o, timeZone: 'UTC' }).format(new Date(d + 'T00:00:00Z'));
const weekdays = computed(() =>
  Array.from({ length: 7 }, (_, i) => format(dayPlus('2024-01-01', i), { weekday: 'short' })),
);
const disabledDay = (d: string) => (!!min && d < min) || (!!max && d > max);
const selected = (d: string) => (range ? d === start || d === end : d === value);
function choose(d: string) {
  if (disabledDay(d)) return;
  focusDay.value = d;
  view.value = startOfMonth(d);
  if (range) {
    if (!start || end) emit('range', { start: d, end: null });
    else emit('range', { start: d < start ? d : start, end: d < start ? start : d });
  } else emit('change', d);
}
async function gridKey(e: KeyboardEvent) {
  const d = keyStep(focusDay.value, e.key, e.shiftKey);
  if (!d) return;
  e.preventDefault();
  if (disabledDay(d)) return;
  focusDay.value = d;
  view.value = startOfMonth(d);
  await nextTick();
  gridEl.value?.querySelector<HTMLElement>('[data-day="' + d + '"]')?.focus();
}
watch(
  () => value,
  (v) => {
    if (isPickDay(v)) {
      focusDay.value = v;
      view.value = startOfMonth(v);
    }
  },
);
</script>
<template>
  <div class="biss-date-picker">
    <input
      class="biss-picker-search"
      v-model="typed"
      :aria-label="typeLabel"
      :placeholder="typeLabel"
      :aria-invalid="!!typed && !parsed"
      @keydown.enter.prevent="parsed && choose(parsed)"
    />
    <p v-if="typed && !parsed" class="biss-date-error" role="status">{{ invalidLabel }}</p>
    <header>
      <b aria-live="polite">{{ format(view, { month: 'long', year: 'numeric' }) }}</b><button
        type="button"
        class="biss-header-action"
        :aria-label="previousLabel"
        @click="view = addMonths(view, -1)"
      >
        <BissIcon name="chevLeft" /></button
      ><button
        type="button"
        class="biss-header-action"
        :aria-label="nextLabel"
        @click="view = addMonths(view, 1)"
      >
        <BissIcon name="chev" />
      </button>
    </header>
    <table ref="gridEl" role="grid" :aria-label="label" @keydown="gridKey">
      <thead>
        <tr>
          <th v-for="d in weekdays" :key="d" scope="col">{{ d }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in grid" :key="i">
          <td
            v-for="cell in row"
            :key="cell.day"
            role="gridcell"
            :aria-selected="selected(cell.day)"
          >
            <button
              type="button"
              :data-day="cell.day"
              :data-out="cell.out"
              :data-selected="selected(cell.day)"
              :data-range="!!start && !!end && cell.day > start && cell.day < end"
              :tabindex="cell.day === focusDay ? 0 : -1"
              :aria-label="format(cell.day, { day: 'numeric', month: 'long', year: 'numeric' })"
              :aria-current="cell.day === today ? 'date' : undefined"
              :disabled="disabledDay(cell.day)"
              @click="choose(cell.day)"
              @focus="focusDay = cell.day"
            >
              {{ Number(cell.day.slice(8)) }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <footer>
      <button
        type="button"
        class="biss-text-button"
        :disabled="disabledDay(today)"
        @click="choose(today)"
      >
        {{ todayLabel }}</button><button
        type="button"
        class="biss-text-button"
        @click="
          emit('change', null);
          emit('range', { start: null, end: null });
        "
      >
        {{ clearLabel }}
      </button>
    </footer>
  </div>
</template>
