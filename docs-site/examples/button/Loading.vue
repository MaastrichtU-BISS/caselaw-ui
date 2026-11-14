<script setup lang="ts">
import { ref } from 'vue';
import { BissButton } from 'biss-ui/vue';

const saving = ref(false);
const saved = ref(0);

async function save() {
  saving.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1200)); // Your request goes here.
  saving.value = false;
  saved.value++;
}
</script>

<template>
  <BissButton :loading="saving" @click="save">Save changes</BissButton>
  <span role="status" style="color: var(--biss-muted)">{{ saved ? `Saved ${saved}×` : 'Not saved yet' }}</span>
</template>
