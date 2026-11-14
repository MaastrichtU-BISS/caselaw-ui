<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { bissTabsTheme } from '../../theme/tabs';
const props = defineProps<TabsContentProps & { class?: HTMLAttributes['class'] }>();
const forwarded = computed(() => {
  const { class: _, ...rest } = props;
  return rest;
});
</script>
<template>
  <TabsContent v-bind="forwarded" :class="[bissTabsTheme.slots.content, props.class]"
    ><slot
  /></TabsContent>
</template>
