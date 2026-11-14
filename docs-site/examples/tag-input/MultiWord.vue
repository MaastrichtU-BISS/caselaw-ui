<script setup lang="ts">
import { ref } from 'vue';
import { BissTagInput } from 'biss-ui/vue';

const partners = ref(['Maastricht University', 'KU Leuven']);
</script>

<template>
  <div style="width: min(100%, 26rem)">
    <BissTagInput v-model="partners" allow-spaces placeholder="Add partner institution" />
  </div>
</template>
