<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissSelect } from 'biss-ui/vue';

const faculty = ref('');
const faculties = [
  { value: 'law', label: 'Faculty of Law' },
  { value: 'fasos', label: 'Arts and Social Sciences' },
  { value: 'sbe', label: 'School of Business and Economics' },
  { value: 'fhml', label: 'Health, Medicine and Life Sciences' },
];
</script>

<template>
  <div style="width: min(100%, 22rem)">
    <BissField
      label="Faculty"
      :hint="faculty ? `Budget code prefix: ${faculty.toUpperCase()}` : 'Decides who approves the budget.'"
    >
      <BissSelect v-model="faculty" :options="faculties" placeholder="Choose a faculty" />
    </BissField>
  </div>
</template>
