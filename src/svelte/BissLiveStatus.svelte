<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    state = 'live',
    reconnectingLabel = 'Reconnecting…',
    offlineLabel = 'Offline',
  }: {
    state?: 'live' | 'reconnecting' | 'offline';
    reconnectingLabel?: string;
    offlineLabel?: string;
  } = $props();
</script>

{#if state !== 'live'}<span class="biss-live-status" role="status"
    ><i class="biss-status-dot"></i>{state === 'offline' ? offlineLabel : reconnectingLabel}</span
  >{/if}
