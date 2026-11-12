<script setup lang="ts">
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
