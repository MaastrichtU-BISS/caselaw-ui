<script setup lang="ts">
import { useId } from 'vue';
import BissIcon from './BissIcon.vue';
import { tooltip } from '../core/dom';
import { actionDirective } from './actions';
const { label, text } = defineProps<{ label: string; text: string }>();
const uid = useId(),
  vTooltip = actionDirective(tooltip);
</script>
<template>
  <span class="biss-tooltip"
    ><button
      type="button"
      class="biss-header-action"
      :aria-label="label"
      :aria-describedby="uid"
      v-tooltip="{ id: uid }"
    >
      <slot><BissIcon name="info" /></slot></button
    ><span :id="uid" role="tooltip" popover="manual" class="biss-tooltip-content">{{
      text
    }}</span></span
  >
</template>
