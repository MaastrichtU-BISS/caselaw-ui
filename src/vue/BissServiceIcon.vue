<template>
  <span class="biss-brand-mark" :aria-label="label" role="img">
    <svg v-if="icon" viewBox="0 0 24 24" aria-hidden="true" class="biss-service-icon">
      <path :d="bissServiceIconPaths[icon]" />
    </svg>
    <span v-else>{{ mark }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { bissServiceIconLabels, bissServiceIconPaths, type BissServiceIconName } from "../icons";

const props = withDefaults(defineProps<{
  icon?: BissServiceIconName;
  mark?: string;
  label?: string;
}>(), {
  mark: "CLE",
});

const label = computed(() => props.label ?? (props.icon ? bissServiceIconLabels[props.icon] : props.mark));
</script>
