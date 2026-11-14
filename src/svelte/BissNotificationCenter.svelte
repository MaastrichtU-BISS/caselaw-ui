<script lang="ts">
  /**
   * A bell with the unread count that opens the latest notifications in a popover.
   * The host supplies the notices and owns read state: picking a row calls `onpick`,
   * “Mark all as read” calls `onreadall`, and the footer links to the full inbox.
   */
  import type { Snippet } from 'svelte';
  import { Popover } from 'bits-ui';
  import BissIcon from './BissIcon.svelte';
  import BissNoticeRow from './BissNoticeRow.svelte';
  import BissButton from './BissButton.svelte';
  import type { BissNotice } from '../core/types';
  import { countLabel, fillLabel } from '../core/blocks';

  interface Props {
    items: BissNotice[];
    /** Total unread, when the host knows more than the notices shown. Defaults to the unread items. */
    unread?: number;
    /** Shows at most this many notices; link to the full inbox for the rest. */
    max?: number;
    loading?: boolean;
    /** A failure message; replaces the list. */
    error?: string;
    open?: boolean;
    label?: string;
    /** Accessible name of the bell when there are unread notices. `{count}` is replaced. */
    unreadLabel?: string;
    markAllLabel?: string;
    emptyTitle?: string;
    emptyCopy?: string;
    loadingLabel?: string;
    retryLabel?: string;
    /** Footer link text. Pass an empty string to hide the footer. */
    seeAllLabel?: string;
    /** Renders the footer as a link. Without it the footer calls `onmore`. */
    seeAllHref?: string;
    width?: number;
    align?: 'start' | 'center' | 'end';
    /** Render the panel in `<body>`, outside clipping ancestors. */
    portal?: boolean;
    onpick?: (item: BissNotice) => void;
    onreadall?: () => void;
    onmore?: () => void;
    onretry?: () => void;
    onOpenChange?: (open: boolean) => void;
    footer?: Snippet;
  }

  let {
    items,
    unread,
    max = 8,
    loading = false,
    error,
    open = $bindable(false),
    label = 'Notifications',
    unreadLabel = 'Notifications, {count} unread',
    markAllLabel = 'Mark all as read',
    emptyTitle = 'You’re all caught up',
    emptyCopy = 'Mentions, assignments and deadlines appear here.',
    loadingLabel = 'Loading notifications…',
    retryLabel = 'Try again',
    seeAllLabel = 'See all notifications',
    seeAllHref,
    width = 380,
    align = 'end',
    portal = false,
    onpick,
    onreadall,
    onmore,
    onretry,
    onOpenChange,
    footer,
  }: Props = $props();

  const uid = $props.id();
  const count = $derived(unread ?? items.filter((item) => item.unread).length);
  const shown = $derived(items.slice(0, Math.max(0, max)));
  const bellLabel = $derived(count ? fillLabel(unreadLabel, { count }) : label);

  function setOpen(value: boolean) {
    open = value;
    onOpenChange?.(value);
  }
  function pick(item: BissNotice) {
    onpick?.(item);
    setOpen(false);
  }
  let panel = $state<HTMLElement | null>(null);
  /** Focus the panel itself, so Tab reaches “Mark all as read” and the rows in order. */
  function focusPanel(event: Event) {
    event.preventDefault();
    panel?.focus({ preventScroll: true });
  }
  function more() {
    onmore?.();
    setOpen(false);
  }
</script>

<Popover.Root {open} onOpenChange={setOpen}>
  <Popover.Trigger
    class="biss-header-action biss-bell"
    aria-label={bellLabel}
    title={label}
    data-open={open || undefined}
    ><BissIcon name="bell" />{#if count}<span class="biss-bell-count" aria-hidden="true"
        >{countLabel(count)}</span
      >{/if}</Popover.Trigger
  >
  <Popover.Portal disabled={!portal}>
    <Popover.Content
      class="biss-block-popover biss-notification-panel"
      {align}
      sideOffset={6}
      collisionPadding={8}
      aria-labelledby={uid + '-title'}
      tabindex={-1}
      bind:ref={panel}
      onOpenAutoFocus={focusPanel}
      style={`width:${width}px`}
    >
      <header class="biss-notification-head">
        <h2 id={uid + '-title'}>{label}</h2>
        {#if count && !loading && !error}<BissButton
            variant="ghost"
            size="sm"
            onclick={() => onreadall?.()}><BissIcon name="check" />{markAllLabel}</BissButton
          >{/if}
      </header>
      {#if loading}
        <div class="biss-notification-loading" role="status">
          <span class="biss-visually-hidden">{loadingLabel}</span>
          {#each [1, 2, 3] as n (n)}<span class="biss-notification-skeleton" aria-hidden="true"
              ><i></i><span><b></b><b></b></span></span
            >{/each}
        </div>
      {:else if error}
        <div class="biss-notification-state" role="alert">
          <BissIcon name="alert" /><strong>{error}</strong>
          <BissButton variant="secondary" size="sm" onclick={() => onretry?.()}
            >{retryLabel}</BissButton
          >
        </div>
      {:else if shown.length}
        <ul class="biss-notification-list">
          {#each shown as item (item.id)}
            <li>
              <BissNoticeRow
                title={item.title}
                detail={item.detail}
                meta={item.meta}
                unread={item.unread}
                onclick={() => pick(item)}
              >
                {#snippet icon()}<span class="biss-notice-icon" data-tone={item.tone ?? 'info'}
                    ><BissIcon name={item.icon ?? 'bell'} /></span
                  >{/snippet}
              </BissNoticeRow>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="biss-notification-state">
          <BissIcon name="bell" /><strong>{emptyTitle}</strong><span>{emptyCopy}</span>
        </div>
      {/if}
      {#if footer}{@render footer()}{:else if seeAllLabel}
        {#if seeAllHref}<a
            class="biss-notification-foot"
            href={seeAllHref}
            onclick={() => setOpen(false)}>{seeAllLabel}<BissIcon name="chev" /></a
          >{:else}<button type="button" class="biss-notification-foot" onclick={more}
            >{seeAllLabel}<BissIcon name="chev" /></button
          >{/if}
      {/if}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
