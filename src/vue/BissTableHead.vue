<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  label,
  sort = null,
  sortable = true,
  align = 'start',
} = defineProps<{
  label: string;
  sort?: 'asc' | 'desc' | null;
  sortable?: boolean;
  align?: 'start' | 'end';
}>();
const emit = defineEmits<{ sort: [direction: 'asc' | 'desc' | null] }>();
</script>
<template>
  <span
    class="biss-table-head"
    :style="{ justifyContent: align === 'end' ? 'flex-end' : 'flex-start' }"
    ><button
      v-if="sortable"
      type="button"
      @click="emit('sort', sort === null ? 'asc' : sort === 'asc' ? 'desc' : null)"
    >
      {{ label }}<BissIcon v-if="sort" :name="sort === 'asc' ? 'arrowUp' : 'arrowDown'" /></button
    ><span v-else>{{ label }}</span
    ><slot
  /></span>
</template>
