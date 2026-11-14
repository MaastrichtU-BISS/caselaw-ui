<script setup lang="ts">
import { ref } from 'vue';
import { BissNotificationCenter, BissSegmentedControl } from 'biss-ui/vue';

const state = ref('empty');
const open = ref(true);
const options = [
  { value: 'empty', label: 'Empty' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Failed' },
];
</script>

<template>
  <div class="example-states">
    <BissSegmentedControl
      label="Notification state"
      :options="options"
      :value="state"
      @change="state = $event; open = true"
    />
    <BissNotificationCenter
      v-model:open="open"
      :items="[]"
      :loading="state === 'loading'"
      :error="state === 'error' ? 'Notifications could not be loaded.' : undefined"
      align="center"
      @retry="state = 'loading'"
    />
  </div>
</template>

<style scoped>
.example-states {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: flex-start;
}
</style>
