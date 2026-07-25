<script setup lang="ts">
import CleButton from "./CleButton.vue";
import CleModal from "./CleModal.vue";

withDefaults(defineProps<{
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  busy?: boolean;
}>(), {
  confirmLabel: "Confirm",
  cancelLabel: "Cancel",
  tone: "danger",
  busy: false,
});

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ confirm: [] }>();
</script>

<template>
  <CleModal v-model="open" :title="title" size="sm" :busy="busy">
    <slot />
    <template #footer>
      <CleButton variant="secondary" :disabled="busy" @click="open = false">{{ cancelLabel }}</CleButton>
      <CleButton :variant="tone === 'danger' ? 'danger' : 'primary'" :disabled="busy" @click="emit('confirm')">
        {{ busy ? "Working..." : confirmLabel }}
      </CleButton>
    </template>
  </CleModal>
</template>
