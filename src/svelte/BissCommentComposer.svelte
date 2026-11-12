<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label = 'Write a comment',
    submitLabel = 'Post comment',
    busy = false,
    error = undefined,
    onsubmit,
  }: {
    label?: string;
    submitLabel?: string;
    busy?: boolean;
    error?: string | undefined;
    onsubmit?: (body: string) => void;
  } = $props();
  type Events = { submit: [body: string] };
  const handlers = {
    get submit() {
      return onsubmit;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let draft = $state('');
  function send() {
    if (busy || !draft.trim()) return;
    emit('submit', draft.trim());
  }
</script>

<form
  class="biss-comment-composer"
  onsubmit={(e) => {
    e.preventDefault();
    send();
  }}
>
  <textarea
    class="biss-textarea"
    bind:value={draft}
    aria-label={label}
    placeholder={label}
    disabled={busy}
    onkeydown={(e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') send();
    }}></textarea>
  <div>
    {#if error}<p role="alert">{error}</p>{/if}<button
      type="submit"
      class="biss-button"
      disabled={busy || !draft.trim()}>{submitLabel}</button
    >
  </div>
</form>
