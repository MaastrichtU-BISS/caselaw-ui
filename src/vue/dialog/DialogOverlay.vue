<script setup lang="ts">
import { DialogOverlay, type DialogOverlayProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { bissDialogTheme } from '../../theme/dialog';
const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes['class'] }>();
</script>
<template>
  <DialogOverlay v-bind="props" :class="[bissDialogTheme.slots.overlay, props.class]"
    ><slot
  /></DialogOverlay>
</template>
