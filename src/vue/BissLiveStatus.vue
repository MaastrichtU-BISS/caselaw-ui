<script setup lang="ts">
const {
  state = 'live',
  reconnectingLabel = 'Reconnecting…',
  offlineLabel = 'Offline',
} = defineProps<{
  state?: 'live' | 'reconnecting' | 'offline';
  reconnectingLabel?: string;
  offlineLabel?: string;
}>();
</script>
<template>
  <span v-if="state !== 'live'" class="biss-live-status" role="status"
    ><i class="biss-status-dot" />{{ state === 'offline' ? offlineLabel : reconnectingLabel }}</span
  >
</template>
