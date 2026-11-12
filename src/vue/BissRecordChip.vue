<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  label,
  href = undefined,
  icon = 'file',
  meta = undefined,
} = defineProps<{
  label: string;
  href?: string | undefined;
  icon?: BissIconName;
  meta?: string | undefined;
}>();
</script>
<template>
  <component :is="href ? 'a' : 'span'" class="biss-record-chip" :href="href"
    ><BissIcon :name="icon" /><span>{{ label }}</span
    ><small v-if="meta">{{ meta }}</small></component
  >
</template>
