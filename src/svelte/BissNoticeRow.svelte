<script lang="ts">
  export let title: string;
  export let detail: string | undefined = undefined;
  export let meta: string | undefined = undefined;
  export let unread = false;
  export let unreadLabel = 'Unread';
</script>

<button type="button" class="biss-notice-row" data-unread={unread} on:click
  ><slot name="icon" /><span class="biss-grow"
    ><strong>{title}</strong><span>{detail ?? ''}</span><small>{meta ?? ''}</small></span
  >{#if unread}<span class="biss-status-dot" role="img" aria-label={unreadLabel}
    ></span>{/if}</button
>
