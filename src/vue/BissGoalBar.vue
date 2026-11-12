<script setup lang="ts">
import { computed } from 'vue';
import { progressPercent } from '../portable';
const props = withDefaults(
  defineProps<{
    value: number | null;
    expected?: number;
    label: string;
    tone?: 'primary' | 'success' | 'danger' | 'warning';
    height?: number;
  }>(),
  { tone: 'primary', height: 8 },
);
const fill = computed(() => progressPercent(props.value));
</script>
<template>
  <div
    class="biss-goal-bar"
    :data-tone="tone"
    role="progressbar"
    :aria-label="label"
    :aria-valuenow="value === null ? undefined : fill"
    aria-valuemin="0"
    aria-valuemax="100"
    :style="{ height: `${height}px` }"
  >
    <i :style="{ width: `${fill}%` }" /><em
      v-if="expected !== undefined"
      :style="{ left: `${progressPercent(expected)}%` }"
    />
  </div>
</template>
