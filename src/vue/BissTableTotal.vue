<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';

const {
  label,
  value,
  note = undefined,
} = defineProps<{ label: string; value: string | number; note?: string | undefined }>();
</script>
<template>
  <span class="biss-table-total" :title="note"
    ><small>{{ label }}</small
    ><b>{{ value }}</b></span
  >
</template>
