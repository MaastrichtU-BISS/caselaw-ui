<script setup lang="ts">
import { ref } from 'vue';
import { BissDatePicker } from 'biss-ui/vue';

const fieldwork = ref<{ start: string | null; end: string | null }>({
  start: '2026-12-07',
  end: '2026-12-18',
});
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 18rem)">
    <BissDatePicker
      range
      :start="fieldwork.start"
      :end="fieldwork.end"
      label="Fieldwork period"
      @range="fieldwork = $event"
    />
    <p role="status">
      Fieldwork: {{ fieldwork.start ?? '…' }} to {{ fieldwork.end ?? '…' }}
    </p>
  </div>
</template>
