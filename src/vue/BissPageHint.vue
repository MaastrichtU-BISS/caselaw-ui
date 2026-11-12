<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const { label, text } = defineProps<{ label: string; text: string }>();
</script>
<template>
  <details class="biss-page-hint">
    <summary :aria-label="label"><BissIcon name="info" /></summary>
    <p>{{ text }}<slot /></p>
  </details>
</template>
