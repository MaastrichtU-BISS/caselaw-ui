<script setup lang="ts">
import { ref, useId } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import BissSwatchPicker from './BissSwatchPicker.vue';
import BissEditableText from './BissEditableText.vue';
import { bissSwatches, type BissLabel } from '../core/types';
import { moveItem, validateLabel, uniqueLabel } from '../core/collections';
const {
  colorLabel = 'Color: {label}',
  nameLabel = 'Name: {label}',
  requiredLabel = 'Enter a label name.',
  duplicateLabel = 'Choose a unique label name.',

  items,
  label = 'Edit labels',
  addLabel = 'Add label',
  newLabel = 'New label',
  removeLabel = 'Remove',
  upLabel = 'Move up',
  downLabel = 'Move down',
} = defineProps<{
  colorLabel?: string;
  nameLabel?: string;
  requiredLabel?: string;
  duplicateLabel?: string;

  items: BissLabel[];
  label?: string;
  addLabel?: string;
  newLabel?: string;
  removeLabel?: string;
  upLabel?: string;
  downLabel?: string;
}>();
const emit = defineEmits<{ change: [items: BissLabel[]] }>();
const uid = useId();
let sequence = 0;
const error = ref('');
const colors = bissSwatches.map((c) => ({ ...c, value: c.color }));
function rename(id: string, name: string) {
  const result = validateLabel(items, id, name);
  error.value =
    result.error === 'required'
      ? requiredLabel
      : result.error === 'duplicate'
        ? duplicateLabel
        : '';
  if (result.items) emit('change', result.items);
}
function add() {
  emit('change', [
    ...items,
    {
      id: uid + '-' + sequence++,
      label: uniqueLabel(items, newLabel),
      color: colors[items.length % colors.length]!.color,
    },
  ]);
}
</script>
<template>
  <section class="biss-label-editor" :aria-label="label">
    <h3>{{ label }}</h3>
    <div v-for="(item, i) in items" :key="item.id" class="biss-editor-row">
      <BissSwatchPicker
        :label="colorLabel.replace('{label}', item.label)"
        :value="item.color"
        :colors="colors"
        @change="
          emit(
            'change',
            items.map((v) => (v.id === item.id ? { ...v, color: $event } : v)),
          )
        "
      /><BissEditableText
        :label="nameLabel.replace('{label}', item.label)"
        :value="item.label"
        :readonly="item.locked"
        @change="rename(item.id, $event)"
      /><small v-if="item.count !== undefined">{{ item.count }}</small
      ><button
        type="button"
        class="biss-header-action"
        :aria-label="upLabel + ' ' + item.label"
        :disabled="i === 0"
        @click="emit('change', moveItem(items, i, -1))"
      >
        <BissIcon name="arrowUp" /></button
      ><button
        type="button"
        class="biss-header-action"
        :aria-label="downLabel + ' ' + item.label"
        :disabled="i === items.length - 1"
        @click="emit('change', moveItem(items, i, 1))"
      >
        <BissIcon name="arrowDown" /></button
      ><button
        type="button"
        class="biss-header-action"
        :aria-label="removeLabel + ' ' + item.label"
        :disabled="item.locked || !!item.count"
        @click="
          emit(
            'change',
            items.filter((v) => v.id !== item.id),
          )
        "
      >
        <BissIcon name="x" />
      </button>
    </div>
    <p v-if="error" class="biss-field-error" role="alert">{{ error }}</p>
    <button type="button" class="biss-text-button" @click="add">{{ addLabel }}</button>
  </section>
</template>
