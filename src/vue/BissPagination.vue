<script setup lang="ts">
import { computed, useId } from 'vue';
import BissIcon from './BissIcon.vue';
import { clampPage, pageCount, pageRange, paginationRange } from '../core/pagination';
const props = withDefaults(
  defineProps<{
    /** Total number of records; use `pages` instead when only the page count is known. */
    total?: number;
    /** Number of pages, overriding the count derived from `total` and `pageSize`. */
    pages?: number;
    /** Offer these page sizes in a select. Omit to hide the page-size control. */
    pageSizes?: number[];
    /** Pages shown on each side of the current page. */
    siblings?: number;
    /** Pages always shown at the start and end. */
    boundaries?: number;
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    /** Accessible name of each page button; `{page}` is replaced. */
    pageLabel?: string;
    pageSizeLabel?: string;
    /** Visible record range when `total` is known; `{start}`, `{end}` and `{total}` are replaced. */
    rangeLabel?: string;
    disabled?: boolean;
  }>(),
  {
    siblings: 1,
    boundaries: 1,
    label: 'Pagination',
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
    pageLabel: 'Page {page}',
    pageSizeLabel: 'Rows per page',
    rangeLabel: '{start}–{end} of {total}',
    disabled: false,
  },
);
const page = defineModel<number>('page', { default: 1 });
const pageSize = defineModel<number>('pageSize', { default: 25 });
const uid = useId();
const count = computed(() =>
  props.pages !== undefined
    ? Math.max(1, props.pages)
    : pageCount(props.total ?? 0, pageSize.value),
);
const current = computed(() => clampPage(page.value, count.value));
const items = computed(() =>
  paginationRange(current.value, count.value, {
    siblings: props.siblings,
    boundaries: props.boundaries,
  }),
);
const summary = computed(() => {
  if (props.total === undefined) return '';
  const r = pageRange(current.value, pageSize.value, props.total);
  return props.rangeLabel
    .replace('{start}', String(r.start))
    .replace('{end}', String(r.end))
    .replace('{total}', String(r.total));
});
function go(next: number) {
  const target = clampPage(next, count.value);
  if (target !== current.value) page.value = target;
}
function resize(event: Event) {
  const size = Number((event.target as HTMLSelectElement).value);
  const first = (current.value - 1) * pageSize.value;
  pageSize.value = size;
  page.value = Math.floor(first / size) + 1;
}
</script>
<template>
  <nav class="biss-pagination" :aria-label="label">
    <p v-if="summary" class="biss-pagination-summary" aria-live="polite">{{ summary }}</p>
    <label v-if="pageSizes?.length" class="biss-pagination-size"
      ><span>{{ pageSizeLabel }}</span
      ><select class="biss-select" :value="pageSize" :disabled="disabled" @change="resize">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select></label
    >
    <ul class="biss-pagination-list">
      <li>
        <button
          type="button"
          class="biss-pagination-button"
          :aria-label="previousLabel"
          :disabled="disabled || current <= 1"
          @click="go(current - 1)"
        >
          <BissIcon name="chevLeft" />
        </button>
      </li>
      <li v-for="item in items" :key="item.type === 'page' ? item.page : uid + item.key">
        <button
          v-if="item.type === 'page'"
          type="button"
          class="biss-pagination-button"
          :aria-label="pageLabel.replace('{page}', String(item.page))"
          :aria-current="item.page === current ? 'page' : undefined"
          :disabled="disabled"
          @click="go(item.page)"
        >
          {{ item.page }}
        </button>
        <span v-else class="biss-pagination-ellipsis" aria-hidden="true">…</span>
      </li>
      <li>
        <button
          type="button"
          class="biss-pagination-button"
          :aria-label="nextLabel"
          :disabled="disabled || current >= count"
          @click="go(current + 1)"
        >
          <BissIcon name="chev" />
        </button>
      </li>
    </ul>
  </nav>
</template>
