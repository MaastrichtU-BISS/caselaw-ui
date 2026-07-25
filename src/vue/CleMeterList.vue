<script setup lang="ts">
import { computed } from "vue";
import type { CleMeterItem } from "../types";

const props = defineProps<{
  items: CleMeterItem[];
}>();

const max = computed(() => Math.max(1, ...props.items.map((item) => item.value)));
</script>

<template>
  <div>
    <div v-for="item in items" :key="item.label" class="cle-meter-row">
      <div class="cle-meter-head">
        <span class="cle-meter-name" :title="item.label">{{ item.label }}</span>
        <span class="cle-meter-value">{{ item.display ?? item.value }}</span>
      </div>
      <div class="cle-meter-track">
        <div class="cle-meter-fill" :style="{ width: `${Math.round((item.value / max) * 100)}%` }" />
      </div>
    </div>
  </div>
</template>
