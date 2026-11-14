<script setup lang="ts">
import { ref } from 'vue';
import { BissDateField } from 'biss-ui/vue';

const start = ref<string | null>('2027-01-11');
const end = ref<string | null>('2027-03-26');
</script>

<template>
  <div class="biss-form-row" style="align-items: center">
    Runs from
    <BissDateField
      label="Project start"
      :value="start"
      @change="start = $event"
    />
    to
    <BissDateField
      label="Project end"
      :value="end"
      :min="start ?? undefined"
      @change="end = $event"
    />
  </div>
</template>
