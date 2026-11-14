<script lang="ts">
  /**
   * One update in a feed: who wrote it and when, the body, files, link previews,
   * reactions and the reply count. The host owns the update: reacting calls
   * `onreact`, the reply button `oncomment`, and menu actions `onaction`.
   */
  import type { Snippet } from 'svelte';
  import BissAvatar from './BissAvatar.svelte';
  import BissIcon from './BissIcon.svelte';
  import BissMenu from './BissMenu.svelte';
  import type { BissMenuItem } from '../core/types';
  import { linkHost, type BissFeedUpdate } from '../core/feed';
  import { fillLabel } from '../core/blocks';

  interface Props {
    item: BissFeedUpdate;
    /** Menu actions for this update, such as edit, pin or delete. */
    actions?: BissMenuItem[];
    /** Quick reactions offered by “Add reaction”. */
    emojis?: string[];
    /** Heading level of the optional title. */
    level?: 2 | 3 | 4;
    editedLabel?: string;
    pinnedLabel?: string;
    addReactionLabel?: string;
    /** Accessible name of a reaction. `{emoji}`, `{count}` and `{people}` are replaced. */
    reactionLabel?: string;
    /** The reply button. `{count}` is replaced. */
    commentsLabel?: string;
    replyLabel?: string;
    actionsLabel?: string;
    attachmentsLabel?: string;
    /** Accessible name of the article. `{author}` and `{time}` are replaced. */
    articleLabel?: string;
    onreact?: (value: { id: string; emoji: string }) => void;
    oncomment?: (id: string) => void;
    onaction?: (value: { id: string; key: string }) => void;
    /** Rich body; receives the update. Defaults to the plain `body` text. */
    children?: Snippet<[BissFeedUpdate]>;
  }

  let {
    item,
    actions,
    emojis = ['👍', '🎉', '❤️', '👀', '🙏'],
    level = 3,
    editedLabel = 'edited',
    pinnedLabel = 'Pinned',
    addReactionLabel = 'Add reaction',
    reactionLabel = '{emoji} {count}: {people}',
    commentsLabel = '{count} replies',
    replyLabel = 'Reply',
    actionsLabel = 'More',
    attachmentsLabel = 'Attachments',
    articleLabel = 'Update by {author}, {time}',
    onreact,
    oncomment,
    onaction,
    children,
  }: Props = $props();

  const uid = $props.id();
  let picking = $state(false);
  function react(emoji: string) {
    onreact?.({ id: item.id, emoji });
    picking = false;
  }
  function reactionName(r: { emoji: string; count: number; people?: string }) {
    return fillLabel(reactionLabel, { emoji: r.emoji, count: r.count, people: r.people ?? '' }).replace(
      /:\s*$/,
      '',
    );
  }
  function closePicker(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !picking) return;
    event.stopPropagation();
    picking = false;
    document.getElementById(uid + '-add')?.focus();
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
  class="biss-feed-item"
  data-pinned={item.pinned || undefined}
  aria-label={fillLabel(articleLabel, { author: item.author, time: item.time })}
  onkeydown={closePicker}
>
  <header class="biss-feed-item-head">
    <span class="biss-feed-item-avatar" aria-hidden="true"
      ><BissAvatar name={item.author} size={28} /></span
    >
    <div class="biss-feed-item-who">
      <strong>{item.author}</strong>
      <span class="biss-feed-item-meta"
        ><time datetime={item.datetime}>{item.time}</time>{#if item.edited}<span
            >· {editedLabel}</span
          >{/if}{#if item.pinned}<span class="biss-feed-item-pin"
            ><BissIcon name="pin" />{pinnedLabel}</span
          >{/if}</span
      >
    </div>
    {#if actions?.length}
      <BissMenu
        label={actionsLabel}
        items={actions}
        width={200}
        onpick={(menuItem) => onaction?.({ id: item.id, key: menuItem.key })}
      />
    {/if}
  </header>
  <div class="biss-feed-item-body">
    {#if item.title}<svelte:element this={`h${level}`} class="biss-feed-item-title"
        >{item.title}</svelte:element
      >{/if}
    {#if children}{@render children(item)}{:else if item.body}<p class="biss-feed-item-text">
        {item.body}
      </p>{/if}
    {#if item.attachments?.length}
      <ul class="biss-feed-files" aria-label={attachmentsLabel}>
        {#each item.attachments as file (file.id)}
          <li>
            <svelte:element this={file.href ? 'a' : 'span'} class="biss-feed-file" href={file.href}
              ><span class="biss-feed-file-icon"><BissIcon name="file" /></span><span
                class="biss-feed-file-name"
                ><span>{file.name}</span>{#if file.size || file.type}<small
                    >{[file.size, file.type].filter(Boolean).join(' · ')}</small
                  >{/if}</span
              ></svelte:element
            >
          </li>
        {/each}
      </ul>
    {/if}
    {#if item.links?.length}
      <div class="biss-feed-links">
        {#each item.links as link (link.url)}
          <a class="biss-feed-link" href={link.url} rel="noopener noreferrer nofollow"
            ><span class="biss-feed-link-text"
              ><small>{link.site || linkHost(link.url)}</small><strong
                >{link.title || link.url}</strong
              >{#if link.description}<span>{link.description}</span>{/if}</span
            >{#if link.image}<img src={link.image} alt="" loading="lazy" />{/if}</a
          >
        {/each}
      </div>
    {/if}
  </div>
  <footer class="biss-feed-item-foot">
    {#each item.reactions ?? [] as r (r.emoji)}
      <button
        type="button"
        class="biss-feed-reaction"
        aria-pressed={!!r.reacted}
        aria-label={reactionName(r)}
        title={r.people || undefined}
        onclick={() => react(r.emoji)}
        ><span aria-hidden="true">{r.emoji}</span><span class="biss-feed-reaction-count"
          >{r.count}</span
        ></button
      >
    {/each}
    <span class="biss-feed-picker">
      <button
        id={uid + '-add'}
        type="button"
        class="biss-feed-action"
        aria-label={addReactionLabel}
        title={addReactionLabel}
        aria-expanded={picking}
        aria-controls={uid + '-emojis'}
        onclick={() => (picking = !picking)}><BissIcon name="smile" /></button
      >
      {#if picking}
        <span id={uid + '-emojis'} class="biss-feed-emojis" role="group" aria-label={addReactionLabel}>
          {#each emojis as emoji (emoji)}
            <button
              type="button"
              aria-pressed={!!item.reactions?.some((r) => r.emoji === emoji && r.reacted)}
              onclick={() => react(emoji)}>{emoji}</button
            >
          {/each}
        </span>
      {/if}
    </span>
    <button type="button" class="biss-feed-action biss-feed-comments" onclick={() => oncomment?.(item.id)}
      ><BissIcon name="reply" />{item.comments
        ? fillLabel(commentsLabel, { count: item.comments })
        : replyLabel}</button
    >
  </footer>
</article>
