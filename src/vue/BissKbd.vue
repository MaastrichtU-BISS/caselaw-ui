<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    /** One key, or a combination such as `['⌘', 'K']`. */
    keys?: string | string[];
    /** Spoken name, for example "Command K", since symbols like ⌘ read poorly. */
    label?: string;
    /** Text between keys of a combination; empty by default. */
    separator?: string;
    size?: 'sm' | 'md';
  }>(),
  { separator: '', size: 'md' },
);
const list = computed(() =>
  props.keys === undefined ? [] : Array.isArray(props.keys) ? props.keys : [props.keys],
);
</script>
<template>
  <span class="biss-kbd-combo" :data-size="size"
    ><span v-if="label" class="biss-visually-hidden">{{ label }}</span
    ><span class="biss-kbd-keys" :aria-hidden="label ? 'true' : undefined"
      ><template v-if="list.length"
        ><template v-for="(key, index) in list" :key="index"
          ><span v-if="index && separator" class="biss-kbd-separator">{{ separator }}</span
          ><kbd class="biss-kbd">{{ key }}</kbd></template
        ></template
      ><kbd v-else class="biss-kbd"><slot /></kbd></span
  ></span>
</template>
