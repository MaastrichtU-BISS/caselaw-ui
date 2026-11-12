<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import BissMenu from './BissMenu.vue';
import type { BissMenuItem } from '../core/types';
const {
  label,
  items = [],
  disabled = false,
  moreLabel = 'More ways to add',
} = defineProps<{
  label: string;
  items?: BissMenuItem[];
  disabled?: boolean;
  moreLabel?: string;
}>();
const emit = defineEmits<{ add: []; pick: [item: BissMenuItem] }>();
</script>
<template>
  <span class="biss-tool-new"
    ><button type="button" class="biss-button" :disabled="disabled" @click="emit('add')">
      <BissIcon name="plus" />{{ label }}</button
    ><BissMenu
      v-if="items.length"
      :items="items"
      :label="moreLabel"
      :disabled="disabled"
      @pick="emit('pick', $event)"
  /></span>
</template>
