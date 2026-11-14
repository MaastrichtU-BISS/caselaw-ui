<script setup lang="ts">
import { computed } from 'vue';
import * as Tabs from './tabs';
import {
  bissTabsTheme as theme,
  type BissTabsItem,
  type BissTabsSize,
  type BissTabsUi,
  type BissTabsVariant,
} from '../theme/tabs';
const props = withDefaults(
  defineProps<{
    items: BissTabsItem[];
    /** Accessible name for the tab list. */
    label: string;
    variant?: BissTabsVariant;
    size?: BissTabsSize;
    /** `automatic` selects on arrow-key focus; `manual` waits for Enter or Space. */
    activationMode?: 'automatic' | 'manual';
    ui?: BissTabsUi;
  }>(),
  { variant: 'line', size: 'md', activationMode: 'automatic' },
);
const model = defineModel<string>();
const current = computed(
  () => model.value ?? props.items.find((item) => !item.disabled)?.value ?? '',
);
function select(value: string | number) {
  model.value = String(value);
}
</script>
<template>
  <Tabs.Root
    class="biss-tabs-root"
    :model-value="current"
    :activation-mode="activationMode"
    @update:model-value="select"
  >
    <Tabs.List :aria-label="label" :variant="variant" :size="size" :class="ui?.list">
      <Tabs.Trigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :class="ui?.trigger"
        >{{ item.label
        }}<span v-if="item.count !== undefined" :class="[theme.slots.count, ui?.count]">{{
          item.count
        }}</span></Tabs.Trigger
      >
    </Tabs.List>
    <Tabs.Content v-for="item in items" :key="item.value" :value="item.value" :class="ui?.content"
      ><slot :name="item.value" :item="item"><slot :item="item" /></slot
    ></Tabs.Content>
  </Tabs.Root>
</template>
