<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import { floatPanel, listKeys, closePopover } from '../interactions';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../icon-names';
import BissDatePicker from './BissDatePicker.vue';
import { actionDirective } from './actions';
const {
  label,
  value = null,
  placeholder = 'Choose date',
  min = undefined,
  max = undefined,
  locale = 'en-GB',
  disabled = false,
  width = 300,
} = defineProps<{
  label: string;
  value?: string | null;
  placeholder?: string;
  min?: string | undefined;
  max?: string | undefined;
  locale?: string;
  disabled?: boolean;
  width?: number;
}>();
const emit = defineEmits<{ change: [value: string | null] }>();
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
      <BissIcon name="cal" />{{ value ?? placeholder }}
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
    <BissDatePicker
      :value="value"
      :label="label"
      :min="min"
      :max="max"
      :locale="locale"
      @change="
        emit('change', $event);
        closePopover(panel);
      "
    />
  </div>
</template>
