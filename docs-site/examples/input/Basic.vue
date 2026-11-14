<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissField, BissInput } from 'biss-ui/vue';

const name = ref('Data governance working group');
const slug = computed(() =>
  name.value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
);
</script>

<template>
  <div style="width: min(100%, 24rem)">
    <BissField label="Team name" :hint="`Address: biss.example/teams/${slug || '…'}`">
      <BissInput v-model="name" autocomplete="off" />
    </BissField>
  </div>
</template>
