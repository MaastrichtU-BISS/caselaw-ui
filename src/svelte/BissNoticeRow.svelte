<script lang="ts">
  interface Props {
    title: string;
    detail?: string | undefined;
    meta?: string | undefined;
    unread?: boolean;
    unreadLabel?: string;
    icon?: import('svelte').Snippet;
    onclick?: (event: MouseEvent) => void;
  }

  let {
    title,
    detail = undefined,
    meta = undefined,
    unread = false,
    unreadLabel = 'Unread',
    icon,
    onclick,
  }: Props = $props();
</script>

<button type="button" class="biss-notice-row" data-unread={unread} {onclick}
  >{@render icon?.()}<span class="biss-grow"
    ><strong>{title}</strong><span>{detail ?? ''}</span><small>{meta ?? ''}</small></span
  >{#if unread}<span class="biss-status-dot" role="img" aria-label={unreadLabel}
    ></span>{/if}</button
>
