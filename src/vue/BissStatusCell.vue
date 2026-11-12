<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';

const {
  label,
  color = 'var(--biss-primary)',
  soft = true,
} = defineProps<{ label: string; color?: string; soft?: boolean }>();
</script>
<template>
  <span class="biss-status-cell" :data-soft="soft" :style="{ '--status-color': color }"
    ><i aria-hidden="true" />{{ label }}</span
  >
</template>
