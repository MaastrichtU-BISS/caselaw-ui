<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  tone = 'info',
  title = undefined,
  icon = 'info',
} = defineProps<{
  tone?: 'neutral' | 'info' | 'warning' | 'danger' | 'success';
  title?: string | undefined;
  icon?: BissIconName;
}>();
</script>
<template>
  <aside class="biss-document-callout" :data-tone="tone">
    <BissIcon :name="icon" />
    <div>
      <h3 v-if="title">{{ title }}</h3>
      <slot />
    </div>
  </aside>
</template>
