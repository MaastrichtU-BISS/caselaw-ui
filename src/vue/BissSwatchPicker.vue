<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import { floatPanel, listKeys, closePopover } from '../interactions';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../icon-names';
import { bissSwatches } from '../library-types';
import { actionDirective } from './actions';
const {
  label,
  value = 'blue',
  colors = bissSwatches,
  disabled = false,
  width = 160,
} = defineProps<{
  label: string;
  value?: string;
  colors?: { value: string; label: string; color: string }[];
  disabled?: boolean;
  width?: number;
}>();
const emit = defineEmits<{ change: [value: string] }>();
const vFloat = actionDirective(floatPanel);
const uid = useId();
const panel = ref<HTMLElement | null>(null);
</script>
<template>
  <span class="biss-floating-trigger"
    ><button
      :id="uid + '-anchor'"
      type="button"
      class="biss-picker-trigger"
      :popovertarget="uid"
      :disabled="disabled"
      :aria-label="label"
      aria-haspopup="dialog"
    >
      <i
        class="biss-color-dot"
        :style="{ background: colors.find((c) => c.value === value)?.color }"
      />{{ label }}
    </button></span
  >
  <div
    :id="uid"
    ref="panel"
    popover="auto"
    class="biss-floating"
    role="group"
    :aria-label="label"
    tabindex="-1"
    v-float="{ anchorId: uid + '-anchor', width }"
  >
    <div role="group" :aria-label="label" class="biss-swatch-grid">
      <button
        v-for="color in colors"
        :key="color.value"
        type="button"
        data-choice
        :aria-label="color.label"
        :title="color.label"
        :aria-pressed="color.value === value"
        :style="{ '--swatch': color.color }"
        @click="
          emit('change', color.value);
          closePopover(panel);
        "
      >
        <i />
      </button>
    </div>
  </div>
</template>
