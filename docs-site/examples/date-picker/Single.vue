<script setup lang="ts">
import { ref } from 'vue';
import { BissDatePicker } from 'biss-ui/vue';

const deadline = ref<string | null>('2026-12-15');
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 18rem)">
    <BissDatePicker
      :value="deadline"
      label="Submission deadline"
      @change="deadline = $event"
    />
    <p role="status">Deadline: {{ deadline ?? 'not set' }}</p>
  </div>
</template>
