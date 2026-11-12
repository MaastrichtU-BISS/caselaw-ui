<script setup lang="ts">
import { ref } from 'vue';
import { BissDialog, BissButton } from 'biss-ui/vue';
const open = ref(false);
</script>
<template>
  <BissButton variant="secondary" @click="open = true">Open quick dialog</BissButton
  ><BissDialog
    v-model:open="open"
    title="Quick dialog"
    description="The convenient wrapper uses the same compound foundation."
    size="sm"
    ><p>Use the wrapper when the default header, body and footer fit your task.</p>
    <template #actions><BissButton @click="open = false">Done</BissButton></template></BissDialog
  >
</template>
