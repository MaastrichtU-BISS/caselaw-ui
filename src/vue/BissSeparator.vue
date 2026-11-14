<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical';
    /** Short text centered on a horizontal rule, such as "or". */
    label?: string;
    /** Purely visual: removes the separator from the accessibility tree. */
    decorative?: boolean;
  }>(),
  { orientation: 'horizontal', decorative: false },
);
</script>
<template>
  <div
    class="biss-separator"
    :data-orientation="orientation"
    :data-labelled="label ? true : undefined"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
  >
    <span v-if="label && orientation === 'horizontal'" class="biss-separator-label">{{
      label
    }}</span>
  </div>
</template>
