<template>
  <a
    v-bind="{ ...attrs, onClick: undefined }"
    v-if="href"
    :class="classes"
    :href="disabled || loading ? undefined : href"
    :tabindex="disabled || loading ? -1 : undefined"
    @click="click"
    :aria-disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="biss-button-spinner" aria-hidden="true" /><span
      class="biss-button-label"
      :style="{ opacity: loading ? 0 : undefined }"
      ><slot
    /></span>
  </a>
  <button
    v-bind="{ ...attrs, onClick: undefined }"
    v-else
    :class="classes"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="click"
  >
    <span v-if="loading" class="biss-button-spinner" aria-hidden="true" /><span
      class="biss-button-label"
      :style="{ opacity: loading ? 0 : undefined }"
      ><slot
    /></span>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
function click(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  const handlers = attrs.onClick;
  for (const handle of Array.isArray(handlers) ? handlers : [handlers])
    if (typeof handle === 'function') handle(event);
}

const props = withDefaults(
  defineProps<{
    href?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-quiet';
    size?: 'md' | 'sm';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
    /** Square, sized to a field rather than to text. Needs an aria-label. */
    icon?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
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
