<script setup lang="ts">
import { useBissToasts } from './useBissToasts';

const { toasts, dismiss } = useBissToasts();
</script>

<template>
  <Teleport to="body">
    <div v-if="toasts.length" class="biss-toast-stack" role="region" aria-label="Notifications">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="biss-toast"
        :class="toast.tone === 'neutral' ? '' : `biss-toast-${toast.tone}`"
        role="status"
      >
        <span class="biss-toast-accent" />
        <div class="biss-toast-text">
          <p class="biss-toast-title">{{ toast.title }}</p>
          <p v-if="toast.copy" class="biss-toast-copy">{{ toast.copy }}</p>
        </div>
        <button
          type="button"
          class="biss-toast-dismiss"
          aria-label="Dismiss"
          @click="dismiss(toast.id)"
        >
          &times;
        </button>
      </div>
    </div>
  </Teleport>
</template>
