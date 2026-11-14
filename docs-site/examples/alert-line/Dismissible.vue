<script setup lang="ts">
import { ref } from 'vue';
import { BissAlertLine, BissButton, BissIcon } from 'biss-ui/vue';

const visible = ref(true);
</script>

<template>
  <BissAlertLine v-if="visible">
    You can now export annotations as CSV from the project menu.
    <template #actions>
      <BissButton icon size="sm" variant="ghost" aria-label="Dismiss notice" @click="visible = false">
        <BissIcon name="x" />
      </BissButton>
    </template>
  </BissAlertLine>
  <BissButton v-else size="sm" variant="secondary" @click="visible = true">Show notice again</BissButton>
</template>
