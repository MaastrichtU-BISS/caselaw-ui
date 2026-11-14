<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissSlider } from 'biss-ui/vue';

const budget = ref([50_000, 250_000]);
</script>

<template>
  <BissField label="Grant size" hint="Calls outside this range are hidden.">
    <BissSlider
      v-model="budget"
      :min="0"
      :max="500_000"
      :step="10_000"
      show-value
      :thumb-labels="['Smallest grant', 'Largest grant']"
      :format="{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }"
    />
  </BissField>
</template>
