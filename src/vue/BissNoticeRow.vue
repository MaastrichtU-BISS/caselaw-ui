<script setup lang="ts">
defineProps<{
  title: string;
  detail?: string;
  meta?: string;
  unread?: boolean;
  unreadLabel?: string;
}>();
</script>
<template>
  <button type="button" class="biss-notice-row" :data-unread="unread">
    <slot name="icon" /><span class="biss-grow"
      ><strong>{{ title }}</strong
      ><span v-if="detail"> {{ detail }}</span
      ><small>{{ meta }}</small></span
    ><span v-if="unread" class="biss-status-dot" role="img" :aria-label="unreadLabel ?? 'Unread'" />
  </button>
</template>
