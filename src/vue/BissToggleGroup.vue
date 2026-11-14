<script setup lang="ts">
import { computed } from 'vue';
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui';
import BissIcon from './BissIcon.vue';
import type { BissToggleItem } from '../core/types';
const props = withDefaults(
  defineProps<{
    items: BissToggleItem[];
    /** Accessible name for the group. */
    label: string;
    /** `single` presses one option at a time; `multiple` toggles each option. */
    type?: 'single' | 'multiple';
    /** Show icons only; each item's label becomes its accessible name. */
    iconOnly?: boolean;
    size?: 'sm' | 'md';
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
  }>(),
  { type: 'single', iconOnly: false, size: 'md', disabled: false, orientation: 'horizontal' },
);
const model = defineModel<string | string[]>();
const root = computed(
  () =>
    ({
      type: props.type,
      disabled: props.disabled,
      orientation: props.orientation,
      modelValue: model.value ?? (props.type === 'multiple' ? [] : undefined),
    }) as Record<string, unknown>,
);
function update(value: unknown) {
  model.value = props.type === 'multiple' ? ((value as string[]) ?? []) : ((value as string) ?? '');
}
</script>
<template>
  <ToggleGroupRoot
    class="biss-toggle-group"
    :aria-label="label"
    :data-size="size"
    :data-icon-only="iconOnly || undefined"
    v-bind="root"
    @update:model-value="update"
  >
    <ToggleGroupItem
      v-for="item in items"
      :key="item.value"
      class="biss-toggle-item"
      :value="item.value"
      :disabled="item.disabled"
      :aria-label="iconOnly ? item.label : undefined"
      :title="iconOnly ? item.label : undefined"
      ><BissIcon v-if="item.icon" :name="item.icon" /><span v-if="!iconOnly || !item.icon">{{
        item.label
      }}</span></ToggleGroupItem
    >
  </ToggleGroupRoot>
</template>
