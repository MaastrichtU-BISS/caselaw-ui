<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const { title = 'Access restricted', description = 'Contact the owner to request access.' } =
  defineProps<{ title?: string; description?: string }>();
</script>
<template>
  <div class="biss-no-access">
    <BissIcon name="lock" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <slot name="actions" />
  </div>
</template>
