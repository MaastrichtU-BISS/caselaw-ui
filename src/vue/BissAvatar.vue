<script setup lang="ts">
import { computed } from 'vue';
import { avatarHue, initials } from '../core/format';
const props = withDefaults(defineProps<{ name: string; size?: number; label?: string }>(), {
  size: 32,
});
const hue = computed(() => avatarHue(props.name));
const text = computed(() => initials(props.name));
</script>
<template>
  <span
    class="biss-avatar"
    role="img"
    :aria-label="label ?? name"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.38}px`, '--h': hue }"
    >{{ text }}</span
  >
</template>
