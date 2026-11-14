<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissSelect } from 'biss-ui/vue';

const currency = ref('eur');
const currencies = [
  { value: 'eur', label: 'Euro (EUR)' },
  { value: 'gbp', label: 'Pound sterling (GBP)' },
  { value: 'chf', label: 'Swiss franc (CHF)' },
];
</script>

<template>
  <div style="width: min(100%, 22rem)">
    <BissField label="Reporting currency" hint="Set by the Horizon Europe programme." disabled>
      <BissSelect v-model="currency" :options="currencies" />
    </BissField>
  </div>
</template>
