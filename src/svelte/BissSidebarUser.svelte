<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissMenu from './BissMenu.svelte';
  import BissConfirmDialog from './BissConfirmDialog.svelte';
  import { initials as nameInitials } from '../core/format';
  let {
    name,
    email,
    initials,
    accountHref,
    accountLabel = 'Your account',
    signOut = false,
    signOutLabel = 'Sign out',
    confirmSignOut = true,
    signOutTitle = 'Sign out?',
    signOutCopy,
    busy = false,
    menu,
    onsignOut,
  }: {
    name: string;
    email?: string;
    initials?: string;
    accountHref?: string;
    accountLabel?: string;
    signOut?: boolean;
    signOutLabel?: string;
    confirmSignOut?: boolean;
    signOutTitle?: string;
    signOutCopy?: string;
    busy?: boolean;
    menu?: Snippet;
    onsignOut?: () => void;
  } = $props();
  let confirming = $state(false);
  let items = $derived([
    ...(accountHref ? [{ key: 'account', label: accountLabel, href: accountHref }] : []),
    ...(signOut ? [{ key: 'signout', label: signOutLabel, disabled: busy }] : []),
  ]);
</script>

<div class="biss-sidebar-user">
  <span class="biss-sidebar-user-avatar">{initials ?? nameInitials(name)}</span>
  <div class="biss-sidebar-user-text">
    <span class="biss-sidebar-user-name">{name}</span>{#if email}<span
        class="biss-sidebar-user-email">{email}</span
      >{/if}
  </div>
  {#if items.length}<BissMenu
      label={name}
      {items}
      onpick={(item) => {
        if (item.key === 'signout') {
          if (confirmSignOut) confirming = true;
          else onsignOut?.();
        }
      }}
    />{/if}{@render menu?.()}
</div>
<BissConfirmDialog
  bind:open={confirming}
  title={signOutTitle}
  confirmLabel={signOutLabel}
  {busy}
  onconfirm={() => onsignOut?.()}>{signOutCopy ?? ''}</BissConfirmDialog
>
