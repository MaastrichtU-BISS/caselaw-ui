<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissNumberField } from 'biss-ui/vue';

const seats = ref<number | null>(4);
</script>

<template>
  <BissField label="Team seats" hint="Between 1 and 50.">
    <BissNumberField v-model="seats" :min="1" :max="50" />
  </BissField>
</template>
