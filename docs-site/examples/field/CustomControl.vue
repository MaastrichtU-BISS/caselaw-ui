<script setup lang="ts">
import { ref } from 'vue';
import { BissField } from 'biss-ui/vue';

const share = ref(40);
</script>

<template>
  <div style="width: min(100%, 24rem)">
    <BissField label="Time on this project" :hint="`${share}% of your contract hours`">
      <template #default="{ control }">
        <input v-bind="control" v-model.number="share" type="range" min="0" max="100" step="10" />
      </template>
    </BissField>
  </div>
</template>
