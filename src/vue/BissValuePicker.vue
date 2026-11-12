<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BissPickOption } from '../core/types';
import { toggleValue } from '../core/format';
const {
  options,
  selected = [],
  label,
  negate = false,
  canNegate = false,
  searchLabel = 'Search values',
  clearLabel = 'Clear',
  isLabel = 'Is',
  isNotLabel = 'Is not',
  emptyLabel = 'No matching values',
} = defineProps<{
  options: BissPickOption[];
  selected?: string[];
  label: string;
  negate?: boolean;
  canNegate?: boolean;
  searchLabel?: string;
  clearLabel?: string;
  isLabel?: string;
  isNotLabel?: string;
  emptyLabel?: string;
}>();
const emit = defineEmits<{ change: [value: string[]]; negate: [value: boolean] }>();
const query = ref('');
const shown = computed(() =>
  options.filter((o) => o.label.toLowerCase().includes(query.value.toLowerCase())),
);
</script>
<template>
  <div class="biss-value-picker">
    <header>
      <b>{{ label }}</b><span v-if="canNegate" class="biss-segmented"
        ><button type="button" :aria-pressed="!negate" @click="emit('negate', false)">
          {{ isLabel }}</button
        ><button type="button" :aria-pressed="negate" @click="emit('negate', true)">
          {{ isNotLabel }}
        </button></span
      >
    </header>
    <input
      class="biss-picker-search"
      v-model="query"
      :placeholder="searchLabel"
      :aria-label="searchLabel"
    />
    <div class="biss-picker-option-scroll" role="group" :aria-label="label">
      <label v-for="option in shown" :key="option.value" class="biss-picker-option"
        ><input
          type="checkbox"
          :checked="selected.includes(option.value)"
          :disabled="option.disabled"
          @change="emit('change', toggleValue(selected, option.value))"
        /><i
          v-if="option.color"
          class="biss-color-dot"
          :style="{ background: option.color }"
        /><span class="biss-grow">{{ option.label }}</span
        ><small v-if="option.count !== undefined">{{ option.count }}</small></label
      >
      <p v-if="!shown.length">{{ emptyLabel }}</p>
    </div>
    <footer>
      <span>{{ selected.length }}</span><button
        type="button"
        class="biss-text-button"
        @click="emit('change', [])"
      >
        {{ clearLabel }}
      </button>
    </footer>
  </div>
</template>
