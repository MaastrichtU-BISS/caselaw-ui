<script setup lang="ts">
import { useCleToasts } from "./useCleToasts";

const { toasts, dismiss } = useCleToasts();
</script>

<template>
  <Teleport to="body">
    <div v-if="toasts.length" class="cle-toast-stack" role="region" aria-label="Notifications">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="cle-toast"
        :class="toast.tone === 'neutral' ? '' : `cle-toast-${toast.tone}`"
        role="status"
      >
        <span class="cle-toast-accent" />
        <div class="cle-toast-text">
          <p class="cle-toast-title">{{ toast.title }}</p>
          <p v-if="toast.copy" class="cle-toast-copy">{{ toast.copy }}</p>
        </div>
        <button type="button" class="cle-toast-dismiss" aria-label="Dismiss" @click="dismiss(toast.id)">
          &times;
        </button>
      </div>
    </div>
  </Teleport>
</template>
