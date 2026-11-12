<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  label,
  count = undefined,
  color = 'var(--biss-primary)',
  collapsed = false,
} = defineProps<{
  label: string;
  count?: number | undefined;
  color?: string;
  collapsed?: boolean;
}>();
const emit = defineEmits<{ toggle: [collapsed: boolean] }>();
</script>
<template>
  <section class="biss-table-group">
    <header>
      <button type="button" :aria-expanded="!collapsed" @click="emit('toggle', !collapsed)">
        <BissIcon :name="collapsed ? 'chev' : 'chevLeft'" /><i :style="{ background: color }" />{{
          label
        }}<small v-if="count !== undefined">{{ count }}</small></button
      ><slot name="actions" />
    </header>
    <div v-if="!collapsed"><slot /></div>
  </section>
</template>
