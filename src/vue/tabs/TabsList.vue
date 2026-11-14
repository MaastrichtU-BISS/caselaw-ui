<script setup lang="ts">
import { TabsList, type TabsListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { bissTabsTheme, type BissTabsSize, type BissTabsVariant } from '../../theme/tabs';
const props = withDefaults(
  defineProps<
    TabsListProps & {
      variant?: BissTabsVariant;
      size?: BissTabsSize;
      class?: HTMLAttributes['class'];
    }
  >(),
  { variant: 'line', size: 'md', loop: true },
);
const forwarded = computed(() => {
  const { variant, size, class: _, ...rest } = props;
  return rest;
});
</script>
<template>
  <TabsList
    v-bind="forwarded"
    :class="[bissTabsTheme.slots.list, props.class]"
    :data-variant="variant"
    :data-size="size"
    ><slot
  /></TabsList>
</template>
