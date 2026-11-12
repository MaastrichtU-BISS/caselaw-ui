<script setup lang="ts">
import BissButton from "./BissButton.vue";
import BissModal from "./BissModal.vue";

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
  <BissModal v-model="open" :title="title" size="sm" :busy="busy">
    <slot />
    <template #footer>
      <BissButton variant="secondary" data-biss-autofocus :disabled="busy" @click="open = false">
        {{ cancelLabel }}
      </BissButton>
      <BissButton :variant="tone === 'danger' ? 'danger' : 'primary'" :disabled="busy" @click="emit('confirm')">
        {{ busy ? "Working..." : confirmLabel }}
      </BissButton>
    </template>
  </BissModal>
</template>
