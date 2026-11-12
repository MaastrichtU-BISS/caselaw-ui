<script lang="ts">
  import type { BissToastQueue } from '../core/toasts';
  let {
    queue,
    label = 'Notifications',
    dismissLabel = 'Dismiss',
  }: { queue: BissToastQueue; label?: string; dismissLabel?: string } = $props();
  let messages = $state<import('../core/toasts').BissToastMessage[]>([]);
  $effect(() => queue.subscribe((value) => (messages = value)));
</script>

<div class="biss-toast-stack" role="region" aria-label={label}>
  {#each messages as message (message.id)}<div
      class="biss-toast"
      class:biss-toast-success={message.tone === 'success'}
      class:biss-toast-danger={message.tone === 'danger'}
      class:biss-toast-warning={message.tone === 'warning'}
      role="status"
    >
      <span class="biss-toast-accent"></span>
      <div class="biss-toast-text">
        <p class="biss-toast-title">{message.title}</p>
        {#if message.copy}<p class="biss-toast-copy">{message.copy}</p>{/if}
      </div>
      <button
        type="button"
        class="biss-toast-dismiss"
        aria-label={dismissLabel}
        onclick={() => queue.dismiss(message.id)}>×</button
      >
    </div>{/each}
</div>
