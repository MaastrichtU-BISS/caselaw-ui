<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissInput } from 'biss-ui/vue';

const email = ref('');
const budget = ref<number | null>(250000);
const deadline = ref('2027-03-15');
const doi = ref('10.1093/ijlit/eaad004');
</script>

<template>
  <div class="biss-form-grid" style="width: min(100%, 34rem)">
    <BissField label="Principal investigator">
      <BissInput v-model="email" type="email" placeholder="name@university.nl" autocomplete="email" />
    </BissField>
    <BissField label="Requested budget (EUR)">
      <BissInput v-model="budget" type="number" min="0" step="1000" />
    </BissField>
    <BissField label="Submission deadline">
      <BissInput v-model="deadline" type="date" />
    </BissField>
    <BissField label="DOI">
      <BissInput v-model="doi" mono />
    </BissField>
  </div>
</template>
