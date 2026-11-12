<script setup lang="ts">
import { computed } from "vue";
import type { BissMeterItem } from "../types";

const props = defineProps<{
  items: BissMeterItem[];
}>();

const max = computed(() => Math.max(1, ...props.items.map((item) => item.value)));
</script>

<template>
  <div>
    <div v-for="item in items" :key="item.label" class="biss-meter-row">
      <div class="biss-meter-head">
        <span class="biss-meter-name" :title="item.label">{{ item.label }}</span>
        <span class="biss-meter-value">{{ item.display ?? item.value }}</span>
      </div>
      <div class="biss-meter-track">
        <div class="biss-meter-fill" :style="{ width: `${Math.round((item.value / max) * 100)}%` }" />
      </div>
    </div>
  </div>
</template>
