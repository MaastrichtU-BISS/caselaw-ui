<script setup lang="ts">
import { computed } from 'vue';
import BissGoalBar from './BissGoalBar.vue';
const {
  allocated,
  available,
  label,
  locale = 'en-GB',
} = defineProps<{ allocated: number; available: number | null; label: string; locale?: string }>();

const nf = computed(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }));
</script>
<template>
  <span class="biss-capacity" :data-over="available !== null && allocated > available"
    ><BissGoalBar
      :value="available === null || available <= 0 ? null : allocated / available"
      :label="label"
      :tone="available !== null && allocated > available ? 'danger' : 'success'"
    /><b
      >{{ nf.format(allocated)
      }}<small v-if="available !== null"> / {{ nf.format(available) }}</small></b
    ></span
  >
</template>
