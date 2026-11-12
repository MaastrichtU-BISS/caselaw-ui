<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    title,
    body,
    rationale = undefined,
    changes = [],
    busy = false,
    approveLabel = 'Apply change',
    dismissLabel = 'Dismiss',
    onapprove,
    ondismiss,
  }: {
    title: string;
    body: string;
    rationale?: string | undefined;
    changes?: { label: string; before: string; after: string }[];
    busy?: boolean;
    approveLabel?: string;
    dismissLabel?: string;
    onapprove?: () => void;
    ondismiss?: () => void;
  } = $props();
  type Events = { approve: []; dismiss: [] };
  const handlers = {
    get approve() {
      return onapprove;
    },
    get dismiss() {
      return ondismiss;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<article class="biss-proposal-card">
  <header>
    <BissIcon name="spark" />
    <h3>{title}</h3>
  </header>
  <p>{body}</p>
  {#if rationale}<details>
      <summary>Why this change</summary>
      <p>{rationale}</p>
    </details>{/if}{#if changes.length}<dl>
      {#each changes as change}<div>
          <dt>{change.label}</dt>
          <dd><del>{change.before}</del><BissIcon name="chev" /><span>{change.after}</span></dd>
        </div>{/each}
    </dl>{/if}
  <footer>
    <button type="button" class="biss-button" disabled={busy} onclick={() => emit('approve')}
      >{approveLabel}</button
    ><button
      type="button"
      class="biss-button biss-button-ghost"
      disabled={busy}
      onclick={() => emit('dismiss')}>{dismissLabel}</button
    >
  </footer>
</article>
