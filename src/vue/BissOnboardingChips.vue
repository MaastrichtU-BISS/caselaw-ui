<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import type { BissPickOption } from '../library-types';
const {
  options,
  selected = [],
  label,
} = defineProps<{ options: BissPickOption[]; selected?: string[]; label: string }>();
const emit = defineEmits<{ change: [value: string[]] }>();
</script>
<template>
  <div class="biss-onboarding-chips" role="group" :aria-label="label">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      :disabled="o.disabled"
      :aria-pressed="selected.includes(o.value)"
      @click="
        emit(
          'change',
          selected.includes(o.value)
            ? selected.filter((v) => v !== o.value)
            : [...selected, o.value],
        )
      "
    >
      {{ o.label }}
    </button>
  </div>
</template>
