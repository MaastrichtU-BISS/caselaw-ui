<script setup lang="ts">
withDefaults(defineProps<{ href: string; title: string; copy?: string; active?: boolean }>(), {
  copy: '',
  active: false,
});
</script>
<template>
  <a :href="href" class="biss-action-card" :class="{ 'is-active': active }"
    ><span v-if="$slots.icon" class="biss-action-card-icon"><slot name="icon" /></span
    ><span class="biss-action-card-title">{{ title }}</span
    ><span class="biss-action-card-copy"
      ><slot>{{ copy }}</slot></span
    ></a
  >
</template>
