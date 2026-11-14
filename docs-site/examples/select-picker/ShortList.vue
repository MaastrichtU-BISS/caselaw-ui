<script setup lang="ts">
import { ref } from 'vue';
import { BissSelectPicker, type BissPickOption } from 'biss-ui/vue';

const stage = ref('review');
const stages: BissPickOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Internal review' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'awarded', label: 'Awarded', disabled: true, description: 'Set by the grants office' },
];
</script>

<template>
  <BissSelectPicker
    label="Proposal stage"
    :options="stages"
    :value="stage"
    :searchable="false"
    :width="240"
    @change="stage = $event"
  />
</template>
