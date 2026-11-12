<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { bissDialogTheme } from '../../theme/dialog';
const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();
</script>
<template>
  <DialogDescription v-bind="props" :class="[bissDialogTheme.slots.description, props.class]"
    ><slot
  /></DialogDescription>
</template>
