<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { bissTabsTheme } from '../../theme/tabs';
const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>();
const forwarded = computed(() => {
  const { class: _, ...rest } = props;
  return rest;
});
</script>
<template>
  <TabsTrigger v-bind="forwarded" :class="[bissTabsTheme.slots.trigger, props.class]"
    ><slot
  /></TabsTrigger>
</template>
