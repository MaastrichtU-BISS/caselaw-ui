<script setup lang="ts">
import { ref } from 'vue';
import { BissFeed, BissSegmentedControl } from 'biss-ui/vue';

const shown = ref('loading');
const options = [
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Empty' },
  { value: 'error', label: 'Failed' },
];
</script>

<template>
  <div class="example-states">
    <BissSegmentedControl label="Feed state" :options="options" :value="shown" @change="shown = $event" />
    <BissFeed
      :items="[]"
      :composer="false"
      :loading="shown === 'loading'"
      :error="shown === 'error' ? 'Updates could not be loaded.' : undefined"
      @retry="shown = 'loading'"
    />
  </div>
</template>

<style scoped>
.example-states {
  display: grid;
  gap: 16px;
  justify-items: start;
}
</style>
