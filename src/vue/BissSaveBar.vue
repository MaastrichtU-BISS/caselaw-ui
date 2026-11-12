<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean;
    saving?: boolean;
    error?: string;
    note?: string;
    saveLabel?: string;
    discardLabel?: string;
  }>(),
  { note: 'Unsaved changes', saveLabel: 'Save', discardLabel: 'Discard' },
);
const emit = defineEmits<{ save: []; discard: [] }>();
</script>
<template>
  <div v-if="show" class="biss-savebar" role="region" :aria-label="note" :aria-busy="saving">
    <span class="biss-grow" role="status">{{ error || note }}</span
    ><button
      type="button"
      class="biss-button biss-button-ghost"
      :disabled="saving"
      @click="emit('discard')"
    >
      {{ discardLabel }}</button
    ><button type="button" class="biss-button" :disabled="saving" @click="emit('save')">
      {{ saveLabel }}
    </button>
  </div>
</template>
