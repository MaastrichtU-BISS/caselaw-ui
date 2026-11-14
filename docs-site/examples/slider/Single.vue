<script setup lang="ts">
import { ref } from 'vue';
import { BissSlider } from 'biss-ui/vue';

const confidence = ref(70);
</script>

<template>
  <BissSlider
    v-model="confidence"
    label="Confidence"
    show-value
    :format="{ style: 'unit', unit: 'percent' }"
  />
</template>
