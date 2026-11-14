<script setup lang="ts">
/**
 * Choose a starting template: filter by category or search, pick a card, check
 * what it sets up in the preview, then use it. The host owns the templates and
 * performs the setup: `use` carries the chosen template, `blank` starts empty.
 */
import { computed, nextTick, ref, useId, watch } from 'vue';
import BissIcon from './BissIcon.vue';
import BissButton from './BissButton.vue';
import {
  BISS_ALL_TEMPLATES,
  filterTemplates,
  gridStep,
  templateCategories,
  type BissTemplate,
  type BissTemplateCategory,
} from '../core/templates';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    templates: BissTemplate[];
    /** Category labels and order. Defaults to the categories the templates use. */
    categories?: BissTemplateCategory[];
    /** Shows a “Start blank” action beside “Use template”. */
    blank?: boolean;
    /** The use action is running: the button shows progress and ignores clicks. */
    busy?: boolean;
    label?: string;
    searchLabel?: string;
    allLabel?: string;
    categoryLabel?: string;
    useLabel?: string;
    blankLabel?: string;
    includesLabel?: string;
    /** `{query}` is replaced. */
    emptyTitle?: string;
    emptyCopy?: string;
    clearLabel?: string;
    previewEmpty?: string;
  }>(),
  {
    blank: false,
    busy: false,
    label: 'Templates',
    searchLabel: 'Search templates',
    allLabel: 'All',
    categoryLabel: 'Category',
    useLabel: 'Use template',
    blankLabel: 'Start blank',
    includesLabel: 'Includes',
    emptyTitle: 'No templates match “{query}”',
    emptyCopy: 'Try another word, or look in all categories.',
    clearLabel: 'Clear search',
    previewEmpty: 'Choose a template to see what it sets up.',
  },
);
const selected = defineModel<string | null>('selected', { default: null });
const category = defineModel<string>('category', { default: BISS_ALL_TEMPLATES });
const emit = defineEmits<{ use: [template: BissTemplate]; blank: [] }>();

const uid = useId();
const query = ref('');
const grid = ref<HTMLElement | null>(null);
const chips = computed(() => templateCategories(props.templates, props.categories, props.allLabel));
const categoryName = (value?: string) =>
  chips.value.find((c) => c.value === value)?.label ?? value ?? '';
const shown = computed(() =>
  filterTemplates(props.templates, { category: category.value, query: query.value }),
);
const current = computed(() => props.templates.find((t) => t.id === selected.value) ?? null);
/** The card that takes Tab focus: the selected one when visible, else the first. */
const focusId = computed(() =>
  shown.value.some((t) => t.id === selected.value) ? selected.value : shown.value[0]?.id,
);
watch(
  () => category.value,
  (value) => {
    if (!chips.value.some((c) => c.value === value)) category.value = BISS_ALL_TEMPLATES;
  },
);

function columns() {
  const cards = grid.value?.querySelectorAll<HTMLElement>('[role=radio]');
  if (!cards?.length) return 1;
  const top = cards[0]!.offsetTop;
  let n = 0;
  for (const card of cards) {
    if (card.offsetTop !== top) break;
    n++;
  }
  return n;
}
function onKey(event: KeyboardEvent, index: number) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const t = shown.value[index];
    if (t && !props.busy) {
      selected.value = t.id;
      emit('use', t);
    }
    return;
  }
  const next = gridStep(index, shown.value.length, event.key, columns());
  if (next === index || next < 0) return;
  event.preventDefault();
  selected.value = shown.value[next]!.id;
  nextTick(() => grid.value?.querySelectorAll<HTMLElement>('[role=radio]')[next]?.focus());
}
function use() {
  if (current.value && !props.busy) emit('use', current.value);
}
</script>

<template>
  <section class="biss-template-gallery" :aria-label="label">
    <div class="biss-template-gallery-tools">
      <div class="biss-template-gallery-chips" role="group" :aria-label="categoryLabel">
        <button
          v-for="chip in chips"
          :key="chip.value"
          type="button"
          :aria-pressed="category === chip.value"
          @click="category = chip.value"
        >
          {{ chip.label }}<small>{{ chip.count }}</small>
        </button>
      </div>
      <label class="biss-template-gallery-search"
        ><BissIcon name="search" /><input
          v-model="query"
          type="search"
          :placeholder="searchLabel"
          :aria-label="searchLabel"
          :aria-controls="uid + '-grid'"
      /></label>
    </div>
    <div class="biss-template-gallery-body">
      <div
        v-if="shown.length"
        :id="uid + '-grid'"
        ref="grid"
        class="biss-template-gallery-grid"
        role="radiogroup"
        :aria-label="label"
      >
        <button
          v-for="(t, index) in shown"
          :key="t.id"
          type="button"
          role="radio"
          class="biss-template-card"
          :aria-checked="selected === t.id"
          :tabindex="focusId === t.id ? 0 : -1"
          @click="selected = t.id"
          @dblclick="!busy && emit('use', t)"
          @keydown="onKey($event, index)"
        >
          <span class="biss-template-card-icon"><BissIcon :name="t.icon ?? 'layout'" /></span>
          <span class="biss-template-card-text">
            <b>{{ t.name }}</b>
            <small v-if="t.description">{{ t.description }}</small>
          </span>
          <span class="biss-template-card-meta">
            <span v-if="t.category">{{ categoryName(t.category) }}</span
            ><em v-if="t.badge">{{ t.badge }}</em>
          </span>
          <span v-if="selected === t.id" class="biss-template-card-check" aria-hidden="true"
            ><BissIcon name="check"
          /></span>
        </button>
      </div>
      <div v-else :id="uid + '-grid'" class="biss-template-gallery-empty" role="status">
        <BissIcon name="search" /><strong>{{ fillLabel(emptyTitle, { query }) }}</strong
        ><span>{{ emptyCopy }}</span>
        <BissButton
          variant="secondary"
          size="sm"
          @click="
            query = '';
            category = 'all';
          "
          >{{ clearLabel }}</BissButton
        >
      </div>
      <aside class="biss-template-preview" :aria-labelledby="uid + '-preview'" aria-live="polite">
        <template v-if="current">
          <img v-if="current.image" :src="current.image" alt="" class="biss-template-preview-image" />
          <div class="biss-template-preview-head">
            <span class="biss-template-card-icon"><BissIcon :name="current.icon ?? 'layout'" /></span>
            <div>
              <h3 :id="uid + '-preview'">{{ current.name }}</h3>
              <small v-if="current.category">{{ categoryName(current.category) }}</small>
            </div>
          </div>
          <p v-if="current.description">{{ current.description }}</p>
          <template v-if="current.includes?.length">
            <h4>{{ includesLabel }}</h4>
            <ul>
              <li v-for="part in current.includes" :key="part"><BissIcon name="check" />{{ part }}</li>
            </ul>
          </template>
          <slot name="preview" :template="current" />
        </template>
        <p v-else :id="uid + '-preview'" class="biss-template-preview-empty">{{ previewEmpty }}</p>
        <div class="biss-template-preview-actions">
          <BissButton v-if="blank" variant="ghost" @click="emit('blank')">{{ blankLabel }}</BissButton>
          <BissButton :disabled="!current" :loading="busy" @click="use">{{ useLabel }}</BissButton>
        </div>
      </aside>
    </div>
  </section>
</template>
