<script setup lang="ts">
/**
 * An inline, keyboard-driven command list for slash commands and mention pickers.
 * The host owns the typed text (`query`) and where the list sits; the list owns the
 * active row. A host textarea keeps focus and forwards keys through the exposed
 * `handleKey(event)`, pointing its `aria-activedescendant` at `activeId`.
 * With `searchable`, the list has its own search field instead.
 */
import { computed, nextTick, onMounted, ref, useId, watch } from 'vue';
import BissIcon from './BissIcon.vue';
import {
  filterCommands,
  flattenGroups,
  groupCommands,
  initialActive,
  moveActive,
  type BissCommand,
  type BissCommandStep,
} from '../core/commands';

const props = withDefaults(
  defineProps<{
    items: BissCommand[];
    /** Accessible name of the list. */
    label?: string;
    /** Show a search field in the list, for menus opened from a button. */
    searchable?: boolean;
    searchLabel?: string;
    /** Shown when nothing matches. `{query}` is replaced. */
    emptyLabel?: string;
    /** Group rows under their headings while nothing is typed. */
    grouped?: boolean;
    /** Show the keyboard hint below the list. */
    hint?: boolean;
    moveLabel?: string;
    chooseLabel?: string;
    closeLabel?: string;
    /** Screen-reader text for a checked command. */
    checkedLabel?: string;
    /** Focus the search field (or the list) when mounted. */
    autofocus?: boolean;
  }>(),
  {
    label: 'Commands',
    searchable: false,
    searchLabel: 'Search commands',
    emptyLabel: 'Nothing matches “{query}”',
    grouped: true,
    hint: true,
    moveLabel: 'to move',
    chooseLabel: 'to choose',
    closeLabel: 'to close',
    checkedLabel: 'Current',
    autofocus: false,
  },
);
/** The typed text. Bind it with v-model:query, or pass it one-way from a host editor. */
const query = defineModel<string>('query', { default: '' });
const emit = defineEmits<{ pick: [item: BissCommand]; close: [] }>();
defineSlots<{
  leading?: (props: { item: BissCommand }) => unknown;
  empty?: (props: { query: string }) => unknown;
}>();

const uid = useId();
const listId = uid + '-list';
const list = ref<HTMLElement | null>(null);
const field = ref<HTMLInputElement | null>(null);
const typed = computed(() => query.value.trim());
const groups = computed(() =>
  groupCommands(filterCommands(props.items, typed.value), !props.grouped || !!typed.value),
);
const flat = computed(() => flattenGroups(groups.value));
const active = ref(-1);
const optionId = (index: number) => `${uid}-option-${index}`;
/** The active row's id, for a host field's `aria-activedescendant`. */
const activeId = computed(() => (active.value >= 0 ? optionId(active.value) : undefined));
const empty = computed(() => props.emptyLabel.replace('{query}', typed.value));

watch(
  flat,
  (rows) => {
    active.value = initialActive(rows);
  },
  { immediate: true },
);
watch(active, (index) => {
  if (index < 0) return;
  nextTick(() =>
    list.value?.querySelector(`[id="${optionId(index)}"]`)?.scrollIntoView?.({ block: 'nearest' }),
  );
});

function move(step: BissCommandStep) {
  active.value = moveActive(flat.value, active.value, step);
}
function choose(index = active.value) {
  const item = flat.value[index];
  if (!item || item.disabled) return;
  emit('pick', item);
}
/** Handle a navigation key; returns true when the key was used. */
function handleKey(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement | null;
  const typing = !!target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
  if (event.key === 'ArrowDown') move(1);
  else if (event.key === 'ArrowUp') move(-1);
  else if (event.key === 'Home' && !typing) move('first');
  else if (event.key === 'End' && !typing) move('last');
  else if (event.key === 'Enter') {
    if (event.isComposing) return false;
    choose();
  } else if (event.key === 'Escape') emit('close');
  else return false;
  event.preventDefault();
  event.stopPropagation();
  return true;
}
function focus() {
  (props.searchable ? field.value : list.value)?.focus({ preventScroll: true });
}
onMounted(() => {
  if (props.autofocus) focus();
});
defineExpose({ handleKey, move, choose, focus, activeId, listId });
</script>

<template>
  <div class="biss-command-menu" :data-searchable="searchable || undefined">
    <div v-if="searchable" class="biss-command-search">
      <BissIcon name="search" />
      <input
        ref="field"
        v-model="query"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        :aria-controls="listId"
        :aria-activedescendant="activeId"
        :aria-label="searchLabel"
        :placeholder="searchLabel"
        autocomplete="off"
        spellcheck="false"
        @keydown="handleKey"
      />
    </div>
    <div
      :id="listId"
      ref="list"
      class="biss-command-list"
      role="listbox"
      :aria-label="label"
      :aria-activedescendant="searchable ? undefined : activeId"
      :tabindex="searchable ? -1 : 0"
      @keydown="handleKey"
      @mousedown.prevent
    >
      <div
        v-for="(group, g) in groups"
        :key="group.name || '_'"
        role="group"
        :aria-labelledby="group.name ? `${uid}-group-${g}` : undefined"
        :aria-label="group.name ? undefined : label"
      >
        <p v-if="group.name" :id="`${uid}-group-${g}`" class="biss-command-heading">
          {{ group.name }}
        </p>
        <div
          v-for="{ item, index } in group.items"
          :id="optionId(index)"
          :key="item.key"
          class="biss-command-option"
          role="option"
          :aria-selected="index === active"
          :aria-disabled="item.disabled || undefined"
          :data-active="index === active || undefined"
          @pointermove="!item.disabled && active !== index && (active = index)"
          @click="choose(index)"
        >
          <slot name="leading" :item="item"
            ><span v-if="item.icon" class="biss-command-icon"><BissIcon :name="item.icon" /></span
          ></slot>
          <span class="biss-command-text"
            ><span class="biss-command-label">{{ item.label }}</span
            ><small v-if="item.description">{{ item.description }}</small></span
          >
          <small v-if="!group.name && typed && item.group" class="biss-command-group">{{
            item.group
          }}</small>
          <kbd v-if="item.shortcut">{{ item.shortcut }}</kbd>
          <span v-if="item.checked" class="biss-command-check"
            ><BissIcon name="check" /><span class="biss-visually-hidden">{{
              checkedLabel
            }}</span></span
          >
        </div>
      </div>
      <p v-if="!flat.length" class="biss-command-empty" role="status">
        <slot name="empty" :query="typed">{{ empty }}</slot>
      </p>
    </div>
    <p v-if="hint" class="biss-command-hint" aria-hidden="true">
      <kbd>↑</kbd><kbd>↓</kbd> {{ moveLabel }} · <kbd>↵</kbd> {{ chooseLabel }} ·
      <kbd>Esc</kbd> {{ closeLabel }}
    </p>
  </div>
</template>
