<script setup lang="ts">
import BissDialog from './BissDialog.vue';
withDefaults(
  defineProps<{ title: string; subtitle?: string; size?: 'sm' | 'md' | 'lg'; busy?: boolean }>(),
  { size: 'md', busy: false },
);
const open = defineModel<boolean>({ default: false });
</script>
<template>
  <BissDialog
    :open="open"
    :title="title"
    :description="subtitle"
    :width="size === 'sm' ? 440 : size === 'lg' ? 760 : 520"
    :busy="busy"
    @close="open = false"
    ><slot /><template v-if="$slots.footer" #actions><slot name="footer" /></template
  ></BissDialog>
</template>
