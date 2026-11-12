<template>
  <a
    v-if="href"
    :class="classes"
    :href="disabled ? undefined : href"
    :tabindex="disabled ? -1 : undefined"
    @click="disabled && $event.preventDefault()"
    :aria-disabled="disabled"
  >
    <slot />
  </a>
  <button v-else :class="classes" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    href?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-quiet';
    size?: 'md' | 'sm';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    block?: boolean;
    /** Square, sized to a field rather than to text. Needs an aria-label. */
    icon?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    block: false,
    icon: false,
  },
);

const classes = computed(() =>
  [
    'biss-button',
    props.variant === 'primary' ? '' : `biss-button-${props.variant}`,
    props.size === 'sm' ? 'biss-button-sm' : '',
    props.block ? 'biss-button-block' : '',
    props.icon ? 'biss-button-icon' : '',
  ].filter(Boolean),
);
</script>
