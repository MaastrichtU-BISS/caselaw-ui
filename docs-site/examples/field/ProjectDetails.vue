<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissInput, BissSelect, BissTextarea } from 'biss-ui/vue';

const title = ref('Automated citation analysis of EU case law');
const programme = ref('');
const summary = ref('');

const programmes = [
  { value: 'horizon', label: 'Horizon Europe' },
  { value: 'nwo-vidi', label: 'NWO Vidi' },
  { value: 'erc-starting', label: 'ERC Starting Grant' },
];
</script>

<template>
  <form class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)" @submit.prevent>
    <BissField label="Project title" required>
      <BissInput v-model="title" />
    </BissField>
    <BissField label="Funding programme" hint="Shown on the public project page.">
      <BissSelect v-model="programme" :options="programmes" placeholder="Choose a programme" />
    </BissField>
    <BissField label="Summary" hint="Two or three sentences for the review committee.">
      <BissTextarea v-model="summary" :rows="3" />
    </BissField>
  </form>
</template>
