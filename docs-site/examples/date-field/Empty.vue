<script setup lang="ts">
import { ref } from 'vue';
import { BissDateField } from 'biss-ui/vue';

const reviewDate = ref<string | null>(null);
</script>

<template>
  <BissDateField
    label="Ethics review date"
    placeholder="No review scheduled"
    :value="reviewDate"
    @change="reviewDate = $event"
  />
</template>
