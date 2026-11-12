<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  href,
  title,
  description = undefined,
  site = undefined,
} = defineProps<{
  href: string;
  title: string;
  description?: string | undefined;
  site?: string | undefined;
}>();
</script>
<template>
  <a class="biss-bookmark" :href="href"
    ><BissIcon name="link" /><span
      ><b>{{ title }}</b
      ><span v-if="description">{{ description }}</span
      ><small>{{ site ?? href }}</small></span
    ></a
  >
</template>
