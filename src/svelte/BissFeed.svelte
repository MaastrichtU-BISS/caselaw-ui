<script lang="ts">
  /**
   * A stream of updates with a composer on top. The host owns the updates and
   * persistence: posting calls `onpost` with the text, reactions, replies and menu
   * actions bubble up from each item, and “Load more” calls `onmore`.
   */
  import type { Snippet } from 'svelte';
  import BissButton from './BissButton.svelte';
  import BissIcon from './BissIcon.svelte';
  import BissFeedItem from './BissFeedItem.svelte';
  import type { BissMenuItem } from '../core/types';
  import type { BissFeedUpdate } from '../core/feed';

  interface Props {
    items: BissFeedUpdate[];
    /** Menu actions offered on every update. */
    actions?: BissMenuItem[];
    /** Show the composer. */
    composer?: boolean;
    /** The composer text. Bind to restore or clear it. */
    draft?: string;
    /** A post is being saved; the composer waits. */
    posting?: boolean;
    loading?: boolean;
    /** A failure message; replaces the list. */
    error?: string;
    /** More updates exist; shows “Load more”. */
    hasMore?: boolean;
    loadingMore?: boolean;
    label?: string;
    composerLabel?: string;
    placeholder?: string;
    postLabel?: string;
    /** Shortcut hint beside the post button. */
    shortcutLabel?: string;
    emptyTitle?: string;
    emptyCopy?: string;
    loadingLabel?: string;
    retryLabel?: string;
    moreLabel?: string;
    onpost?: (text: string) => void;
    onreact?: (value: { id: string; emoji: string }) => void;
    oncomment?: (id: string) => void;
    onaction?: (value: { id: string; key: string }) => void;
    onmore?: () => void;
    onretry?: () => void;
    /** Replaces the default item rendering. */
    item?: Snippet<[BissFeedUpdate]>;
  }

  let {
    items,
    actions,
    composer = true,
    draft = $bindable(''),
    posting = false,
    loading = false,
    error,
    hasMore = false,
    loadingMore = false,
    label = 'Updates',
    composerLabel = 'Write an update',
    placeholder = 'Share progress, a decision or news with the team…',
    postLabel = 'Post',
    shortcutLabel = '⌘ or Ctrl + Enter to post',
    emptyTitle = 'No updates yet',
    emptyCopy = 'Updates about progress, decisions and news appear here.',
    loadingLabel = 'Loading updates…',
    retryLabel = 'Try again',
    moreLabel = 'Load more updates',
    onpost,
    onreact,
    oncomment,
    onaction,
    onmore,
    onretry,
    item,
  }: Props = $props();

  const uid = $props.id();
  const canPost = $derived(!!draft.trim() && !posting);
  function post(event?: SubmitEvent) {
    event?.preventDefault();
    if (!canPost) return;
    onpost?.(draft.trim());
    draft = '';
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      post();
    }
  }
</script>

<section class="biss-feed" aria-label={label} aria-busy={loading || undefined}>
  {#if composer}
    <form class="biss-feed-composer" onsubmit={post}>
      <label for={uid + '-draft'} class="biss-visually-hidden">{composerLabel}</label>
      <textarea
        id={uid + '-draft'}
        bind:value={draft}
        class="biss-textarea"
        rows="2"
        {placeholder}
        readonly={posting}
        aria-describedby={uid + '-hint'}
        onkeydown={keydown}
      ></textarea>
      <div class="biss-feed-composer-row">
        <small id={uid + '-hint'}>{shortcutLabel}</small>
        <BissButton type="submit" size="sm" loading={posting} disabled={!draft.trim()}
          >{postLabel}</BissButton
        >
      </div>
    </form>
  {/if}
  {#if loading}
    <div class="biss-feed-skeleton" role="status">
      <span class="biss-visually-hidden">{loadingLabel}</span>
      {#each [1, 2] as n (n)}<span aria-hidden="true"
          ><i></i><span><b></b><b></b><b></b></span></span
        >{/each}
    </div>
  {:else if error}
    <div class="biss-feed-state" role="alert">
      <BissIcon name="alert" /><strong>{error}</strong>
      <BissButton variant="secondary" size="sm" onclick={() => onretry?.()}>{retryLabel}</BissButton>
    </div>
  {:else if !items.length}
    <div class="biss-feed-state">
      <BissIcon name="chat" /><strong>{emptyTitle}</strong><span>{emptyCopy}</span>
    </div>
  {:else}
    <div class="biss-feed-list">
      {#each items as update (update.id)}
        {#if item}{@render item(update)}{:else}<BissFeedItem
            item={update}
            {actions}
            {onreact}
            {oncomment}
            {onaction}
          />{/if}
      {/each}
    </div>
    {#if hasMore}<BissButton
        class="biss-feed-more"
        variant="ghost"
        size="sm"
        loading={loadingMore}
        onclick={() => onmore?.()}>{moreLabel}</BissButton
      >{/if}
  {/if}
</section>
