<script setup lang="ts">
import { ref } from 'vue';
import { BissDatePicker } from 'biss-ui/vue';

// Claims are only accepted within the grant period.
const claimDate = ref<string | null>('2026-11-20');
</script>

<template>
  <div style="width: min(100%, 18rem)">
    <BissDatePicker
      :value="claimDate"
      min="2026-11-10"
      max="2026-11-30"
      label="Expense date"
      @change="claimDate = $event"
    />
  </div>
</template>
