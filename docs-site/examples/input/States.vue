<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissInput } from 'biss-ui/vue';

const costCentre = ref('KP-41');
const invalid = computed(() => !/^[A-Z]{2}-\d{4}$/.test(costCentre.value));
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 22rem)">
    <BissInput v-model="costCentre" :invalid="invalid" aria-label="Cost centre" mono />
    <BissInput model-value="Archived 12 May 2026" aria-label="Archive date" disabled />
  </div>
</template>
