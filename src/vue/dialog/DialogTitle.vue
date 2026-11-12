<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { bissDialogTheme } from '../../theme/dialog';
const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();
</script>
<template>
  <DialogTitle v-bind="props" :class="[bissDialogTheme.slots.title, props.class]"
    ><slot
  /></DialogTitle>
</template>
