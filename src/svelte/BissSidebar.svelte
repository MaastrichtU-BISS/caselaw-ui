<script lang="ts">
  /**
   * An application sidebar: a brand or workspace area, navigation, pinned items and an
   * account footer. On wide screens it collapses to an icon rail (`collapsed`); on
   * phones it is hidden and opens as a drawer (`mobileOpen`) with a focus trap,
   * Escape and an overlay. The host composes the content (BissNavSection, BissNavItem,
   * BissWorkspaceSwitcher, BissSidebarUser) and owns routing and persistence.
   * Snippets receive `collapsed` so content can switch to its compact form.
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import * as Dialog from './dialog';
  import BissIcon from './BissIcon.svelte';
  import BissNavSection from './BissNavSection.svelte';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    collapsed?: boolean;
    mobileOpen?: boolean;
    /** Accessible name of the sidebar and the drawer's title. */
    label?: string;
    /** Heading of the pinned section. */
    pinnedLabel?: string;
    collapseLabel?: string;
    expandLabel?: string;
    closeLabel?: string;
    /** Show the collapse toggle on wide screens. */
    collapsible?: boolean;
    /** Render the phone drawer in `<body>`. */
    portal?: boolean;
    oncollapse?: (collapsed: boolean) => void;
    onMobileOpenChange?: (open: boolean) => void;
    brand?: Snippet<[boolean]>;
    children?: Snippet<[boolean]>;
    pinned?: Snippet<[boolean]>;
    footer?: Snippet<[boolean]>;
  }

  let {
    collapsed = $bindable(false),
    mobileOpen = $bindable(false),
    label = 'Main navigation',
    pinnedLabel = 'Pinned',
    collapseLabel = 'Collapse sidebar',
    expandLabel = 'Expand sidebar',
    closeLabel = 'Close navigation',
    collapsible = true,
    portal = true,
    oncollapse,
    onMobileOpenChange,
    brand,
    children,
    pinned,
    footer,
    ...rest
  }: Props = $props();

  function toggle() {
    collapsed = !collapsed;
    oncollapse?.(collapsed);
  }
  function setMobile(open: boolean) {
    mobileOpen = open;
    onMobileOpenChange?.(open);
  }
  function closeOnLink(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('a[href]')) setMobile(false);
  }
</script>

{#snippet body(compact: boolean)}
  <div class="biss-sidebar-nav">
    {@render children?.(compact)}
    {#if pinned}<BissNavSection heading={pinnedLabel}
        >{@render pinned(compact)}</BissNavSection
      >{/if}
  </div>
  {#if footer}<div class="biss-sidebar-foot">{@render footer(compact)}</div>{/if}
{/snippet}

<aside {...rest} class="biss-sidebar" aria-label={label} data-collapsed={collapsed || undefined}>
  <div class="biss-sidebar-top">
    {#if brand}<div class="biss-sidebar-brand">{@render brand(collapsed)}</div>{/if}
    {#if collapsible}<button
        type="button"
        class="biss-header-action biss-sidebar-rail-toggle"
        aria-label={collapsed ? expandLabel : collapseLabel}
        title={collapsed ? expandLabel : collapseLabel}
        aria-expanded={!collapsed}
        onclick={toggle}><BissIcon name="panel" /></button
      >{/if}
  </div>
  {@render body(collapsed)}
</aside>
<Dialog.Root open={mobileOpen} onOpenChange={setMobile}>
  <Dialog.Portal disabled={!portal}>
    <Dialog.Overlay class="biss-sidebar-overlay" />
    <Dialog.Content class="biss-sidebar-drawer" width={300} onclick={closeOnLink}>
      <Dialog.Title class="biss-visually-hidden">{label}</Dialog.Title>
      <div class="biss-sidebar-top">
        {#if brand}<div class="biss-sidebar-brand">{@render brand(false)}</div>{/if}
        <Dialog.Close class="biss-header-action biss-sidebar-close" aria-label={closeLabel}
          ><BissIcon name="x" /></Dialog.Close
        >
      </div>
      {@render body(false)}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
