<script setup lang="ts">
import { BissButton, BissIcon, BissPageBar } from 'biss-ui/vue';

const emit = defineEmits<{ back: [] }>();
</script>

<template>
  <BissPageBar heading="h2" title="EU Citation Networks" meta="Ends 30 Nov 2026">
    <template #lead>
      <BissButton icon size="sm" variant="ghost" aria-label="Back to projects" @click="emit('back')">
        <BissIcon name="chevLeft" />
      </BissButton>
    </template>
    <template #actions>
      <BissButton variant="secondary" size="sm"><BissIcon name="link" />Share</BissButton>
      <BissButton size="sm"><BissIcon name="edit" />Edit project</BissButton>
    </template>
  </BissPageBar>
</template>
