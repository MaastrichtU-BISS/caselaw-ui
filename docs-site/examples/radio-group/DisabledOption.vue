<script setup lang="ts">
import { ref } from 'vue';
import { BissRadioGroup, type BissPickOption } from 'biss-ui/vue';

const cadence = ref('quarterly');
const cadences: BissPickOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  {
    value: 'final',
    label: 'Final report only',
    description: 'Not allowed for projects longer than 24 months.',
    disabled: true,
  },
];
</script>

<template>
  <div style="width: min(100%, 26rem)">
    <BissRadioGroup
      label="Progress reports"
      :options="cadences"
      :value="cadence"
      @change="cadence = $event"
    />
  </div>
</template>
