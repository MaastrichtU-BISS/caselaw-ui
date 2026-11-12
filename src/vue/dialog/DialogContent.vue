<script setup lang="ts">
import {
  DialogContent,
  type DialogContentProps,
  type DialogContentEmits,
  useForwardPropsEmits,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { bissDialogTheme, type BissDialogSize } from '../../theme/dialog';
const props = withDefaults(
  defineProps<
    DialogContentProps & { size?: BissDialogSize; width?: number; class?: HTMLAttributes['class'] }
  >(),
  { size: 'md' },
);
const emit = defineEmits<DialogContentEmits>();
const forwarded = useForwardPropsEmits(
  computed(() => {
    const { size, width, class: _, ...rest } = props;
    return rest;
  }),
  emit,
);
</script>
<template>
  <DialogContent
    v-bind="forwarded"
    :class="[bissDialogTheme.slots.content, props.class]"
    :style="{ '--dialog-width': (width ?? bissDialogTheme.sizes[size]) + 'px' }"
    ><slot
  /></DialogContent>
</template>
