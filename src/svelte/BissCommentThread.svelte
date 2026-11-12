<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissAvatar from './BissAvatar.svelte';
  import BissCommentComposer from './BissCommentComposer.svelte';
  import type { BissComment } from '../core/types';
  let {
    composerLabel = 'Write a comment',
    submitLabel = 'Post comment',

    items,
    label = 'Discussion',
    resolved = false,
    readonly = false,
    resolveLabel = 'Resolve',
    reopenLabel = 'Reopen',
    onresolve,
    oncomment,
  }: {
    composerLabel?: string;
    submitLabel?: string;

    items: BissComment[];
    label?: string;
    resolved?: boolean;
    readonly?: boolean;
    resolveLabel?: string;
    reopenLabel?: string;
    onresolve?: (value: boolean) => void;
    oncomment?: (body: string) => void;
  } = $props();
  type Events = { resolve: [value: boolean]; comment: [body: string] };
  const handlers = {
    get resolve() {
      return onresolve;
    },
    get comment() {
      return oncomment;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-comment-thread" aria-label={label}>
  <header>
    <h3>{label} <small>{items.length}</small></h3>
    {#if !readonly}<button
        type="button"
        class="biss-text-button"
        onclick={() => emit('resolve', !resolved)}>{resolved ? reopenLabel : resolveLabel}</button
      >{/if}
  </header>
  <ol>
    {#each items as item (item.id)}<li>
        <BissAvatar name={item.author} size={26} />
        <div>
          <b>{item.author}</b><small>{item.time}</small>
          <p>{item.body}</p>
        </div>
      </li>{/each}
  </ol>
  {#if !readonly && !resolved}<BissCommentComposer
      label={composerLabel}
      {submitLabel}
      onsubmit={(body) => emit('comment', body)}
    />{/if}
</section>
