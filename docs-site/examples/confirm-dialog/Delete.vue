<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissConfirmDialog } from 'biss-ui/vue';

const open = ref(false);
const deleted = ref(false);

function remove() {
  deleted.value = true;
  open.value = false;
}
</script>

<template>
  <p v-if="deleted" role="status">Climate litigation review was deleted.</p>
  <BissButton v-else variant="danger-quiet" @click="open = true">Delete project</BissButton>
  <BissConfirmDialog
    v-model="open"
    title="Delete Climate litigation review?"
    confirm-label="Delete project"
    @confirm="remove"
  >
    Its 214 annotated rulings and all comments will be removed for everyone. This cannot be undone.
  </BissConfirmDialog>
</template>
