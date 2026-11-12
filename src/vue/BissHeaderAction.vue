<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  label,
  icon = undefined,
  href = undefined,
  pressed = undefined,
  disabled = false,
  shortcut = undefined,
} = defineProps<{
  label: string;
  icon?: BissIconName | undefined;
  href?: string | undefined;
  pressed?: boolean | undefined;
  disabled?: boolean;
  shortcut?: string | undefined;
}>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
</script>
<template>
  <component
    :is="href && !disabled ? 'a' : 'button'"
    class="biss-header-action"
    :href="disabled ? undefined : href"
    :type="href ? undefined : 'button'"
    :disabled="disabled"
    :aria-label="label"
    :title="label"
    :aria-pressed="pressed"
    :aria-keyshortcuts="shortcut"
    @click="emit('click', $event)"
    ><slot><BissIcon v-if="icon" :name="icon" /></slot
  ></component>
</template>
