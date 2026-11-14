<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissNumberField } from 'biss-ui/vue';

const amount = ref<number | null>(1250.5);
</script>

<template>
  <BissField label="Travel budget" :error="amount === null ? 'Enter an amount.' : undefined">
    <BissNumberField
      v-model="amount"
      :min="0"
      :step="50"
      locale="nl-NL"
      :format="{ style: 'currency', currency: 'EUR' }"
      :invalid="amount === null"
    />
  </BissField>
</template>
