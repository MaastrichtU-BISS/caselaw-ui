<script setup lang="ts">
import { ref, useId } from 'vue';
import { floatPanel } from '../core/dom';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';

import { actionDirective } from './actions';
const {
  label,
  disabled = false,
  width = 280,
} = defineProps<{ label: string; disabled?: boolean; width?: number }>();

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
      {{ label }}
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
    <div role="dialog" :aria-label="label"><slot /></div>
  </div>
</template>
