<script setup lang="ts">
import { ref } from 'vue';
import { BissRadioGroup, type BissPickOption } from 'biss-ui/vue';

const access = ref('restricted');
const levels: BissPickOption[] = [
  { value: 'open', label: 'Open', description: 'Anyone can download the dataset.' },
  {
    value: 'restricted',
    label: 'Restricted',
    description: 'Researchers request access and the data steward approves.',
  },
  { value: 'closed', label: 'Closed', description: 'Only the project team can see the files.' },
];
</script>

<template>
  <div style="width: min(100%, 26rem)">
    <BissRadioGroup
      label="Who can access the dataset?"
      :options="levels"
      :value="access"
      @change="access = $event"
    />
  </div>
</template>
