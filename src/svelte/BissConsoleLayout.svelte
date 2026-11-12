<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissLink } from '../tokens';
  import type { BissServiceIconName } from '../core/service-icons';
  import type { BissConsoleUser, BissCrumb } from '../core/types';
  import BissAppShell from './BissAppShell.svelte';
  import BissConsoleHeader from './BissConsoleHeader.svelte';
  import BissSidebarUser from './BissSidebarUser.svelte';
  let {
    brand = 'Workspace',
    mark = 'B',
    icon,
    iconLabel,
    favicon = true,
    href = '/',
    topLinks = [],
    footer = false,
    footerText = 'Managed by BISS Institute.',
    footerLinks = [],
    fluid = false,
    title,
    subtitle,
    crumbs = [],
    user,
    accountHref,
    signOut = false,
    signOutLabel = 'Sign out',
    confirmSignOut = true,
    signOutTitle = 'Sign out?',
    signOutCopy,
    busy = false,
    children,
    nav,
    navFooter,
    userActions,
    topbarActions,
    actions,
    tabs,
    onsignOut,
  }: {
    brand?: string;
    mark?: string;
    icon?: BissServiceIconName;
    iconLabel?: string;
    favicon?: boolean;
    href?: string;
    topLinks?: BissLink[];
    footer?: boolean;
    footerText?: string;
    footerLinks?: BissLink[];
    fluid?: boolean;
    title?: string;
    subtitle?: string;
    crumbs?: BissCrumb[];
    user?: BissConsoleUser;
    accountHref?: string;
    signOut?: boolean;
    signOutLabel?: string;
    confirmSignOut?: boolean;
    signOutTitle?: string;
    signOutCopy?: string;
    busy?: boolean;
    children?: Snippet;
    nav?: Snippet;
    navFooter?: Snippet;
    userActions?: Snippet;
    topbarActions?: Snippet;
    actions?: Snippet;
    tabs?: Snippet;
    onsignOut?: () => void;
  } = $props();
</script>

{#snippet sidebarContent()}{@render nav?.()}{@render navFooter?.()}{/snippet}{#snippet account()}{#if user}<BissSidebarUser
      name={user.name}
      email={user.email}
      initials={user.initials}
      {accountHref}
      {signOut}
      {signOutLabel}
      {confirmSignOut}
      {signOutTitle}
      {signOutCopy}
      {busy}
      {onsignOut}
      menu={userActions}
    />{/if}{/snippet}
<BissAppShell
  {brand}
  {mark}
  {icon}
  {iconLabel}
  {favicon}
  {href}
  {topLinks}
  {footer}
  {footerText}
  {footerLinks}
  {fluid}
  sidebar={nav || navFooter ? sidebarContent : undefined}
  sidebarFooter={user ? account : undefined}
  {topbarActions}
  >{#if title || crumbs.length}<BissConsoleHeader title={title ?? ''} {subtitle} {crumbs} {actions}
      >{@render tabs?.()}</BissConsoleHeader
    >{/if}{@render children?.()}</BissAppShell
>
