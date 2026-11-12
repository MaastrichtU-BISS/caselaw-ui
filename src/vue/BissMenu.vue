<script setup lang="ts">
import { computed, ref, nextTick, useId } from 'vue';
import { floatPanel, closePopover } from '../core/dom';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import type { BissMenuItem } from '../core/types';
import { actionDirective } from './actions';
const {
  label,
  items,
  searchable = false,
  searchLabel = 'Search actions',
  backLabel = 'Back',
  emptyLabel = 'No matching actions',
  disabled = false,
  width = 280,
} = defineProps<{
  label: string;
  items: BissMenuItem[];
  searchable?: boolean;
  searchLabel?: string;
  backLabel?: string;
  emptyLabel?: string;
  disabled?: boolean;
  width?: number;
}>();
const emit = defineEmits<{ pick: [item: BissMenuItem] }>();
const vFloat = actionDirective(floatPanel);
const uid = useId();
const panel = ref<HTMLElement | null>(null);
const query = ref('');
const path = ref<BissMenuItem[]>([]);
const shown = computed(() =>
  (path.value.at(-1)?.children ?? items).filter((i) =>
    i.label.toLowerCase().includes(query.value.toLowerCase()),
  ),
);
function choose(item: BissMenuItem) {
  if (item.disabled) return;
  if (item.children) {
    path.value = [...path.value, item];
    query.value = '';
    nextTick(() => panel.value?.querySelector<HTMLElement>('[data-choice]')?.focus());
    return;
  }
  closePopover(panel.value);
  emit('pick', item);
  if (item.href) location.assign(item.href);
}
</script>
<template>
  <span class="biss-floating-trigger"
    ><button
      :id="uid + '-anchor'"
      type="button"
      class="biss-picker-trigger"
      :popovertarget="uid"
      :disabled="disabled"
      :aria-label="label"
      aria-haspopup="menu"
    >
      {{ label }}
    </button></span
  >
  <div
    :id="uid"
    ref="panel"
    popover="auto"
    class="biss-floating"
    role="group"
    :aria-label="label"
    tabindex="-1"
    v-float="{
      anchorId: uid + '-anchor',
      width,
      onopen: () => {
        query = '';
        path = [];
      },
    }"
  >
    <input
      v-if="searchable"
      class="biss-picker-search"
      v-model="query"
      :aria-label="searchLabel"
      :placeholder="searchLabel"
    />
    <div role="menu" :aria-label="label">
      <button
        v-if="path.length"
        type="button"
        class="biss-picker-option"
        data-choice
        @click="
          path = path.slice(0, -1);
          query = '';
        "
      >
        <BissIcon name="chevLeft" />{{ backLabel }}</button
      ><template v-for="item in shown" :key="item.key"
        ><hr v-if="item.separator" />
        <button
          type="button"
          class="biss-picker-option"
          data-choice
          :role="item.checked === undefined ? 'menuitem' : 'menuitemcheckbox'"
          :aria-checked="item.checked"
          :aria-haspopup="item.children ? 'menu' : undefined"
          :disabled="item.disabled"
          :data-danger="item.danger"
          @click="choose(item)"
        >
          <BissIcon v-if="item.icon" :name="item.icon" /><span class="biss-grow"
            >{{ item.label }}<small v-if="item.description">{{ item.description }}</small></span
          ><BissIcon v-if="item.checked" name="check" /><BissIcon
            v-if="item.children"
            name="chev"
          /><kbd v-if="item.hint">{{ item.hint }}</kbd>
        </button></template
      >
      <p v-if="!shown.length" class="biss-picker-empty">{{ emptyLabel }}</p>
    </div>
  </div>
</template>
