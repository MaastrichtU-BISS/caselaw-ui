<template>
  <span class="cle-brand-mark" :aria-label="label" role="img">
    <svg v-if="icon" viewBox="0 0 24 24" aria-hidden="true" class="cle-service-icon">
      <path :d="cleServiceIconPaths[icon]" />
    </svg>
    <span v-else>{{ mark }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cleServiceIconLabels, cleServiceIconPaths, type CleServiceIconName } from "../icons";

const props = withDefaults(defineProps<{
  icon?: CleServiceIconName;
  mark?: string;
  label?: string;
}>(), {
  mark: "CLE",
});

const label = computed(() => props.label ?? (props.icon ? cleServiceIconLabels[props.icon] : props.mark));
</script>
