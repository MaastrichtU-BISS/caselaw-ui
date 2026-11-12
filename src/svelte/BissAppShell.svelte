<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import type { BissLink } from '../tokens';
  import type { BissServiceIconName } from '../core/service-icons';
  import { setBissFavicon } from '../core/service-icons';
  import { resizeHandle } from '../core/dom';
  import BissTopBar from './BissTopBar.svelte';
  import BissBottomBar from './BissBottomBar.svelte';
  let {
    brand = 'Workspace',
    mark = 'B',
    icon,
    iconLabel,
    href = '/',
    favicon = true,
    topLinks = [],
    footer = false,
    footerText = 'Managed by BISS Institute.',
    footerLinks = [],
    fluid = false,
    children,
    sidebar,
    sidebarFooter,
    topbarActions,
    footerContent,
  }: {
    brand?: string;
    mark?: string;
    icon?: BissServiceIconName;
    iconLabel?: string;
    href?: string;
    favicon?: boolean;
    topLinks?: BissLink[];
    footer?: boolean;
    footerText?: string;
    footerLinks?: BissLink[];
    fluid?: boolean;
    children?: Snippet;
    sidebar?: Snippet;
    sidebarFooter?: Snippet;
    topbarActions?: Snippet;
    footerContent?: Snippet;
  } = $props();
  let open = $state(false),
    collapsed = $state(false),
    width = $state(240);
  onMount(() => {
    if (favicon && icon) setBissFavicon(icon);
  });
</script>

<div
  class="biss-app-shell"
  class:is-sidebar-collapsed={collapsed}
  class:has-footer={footer || !!footerContent}
  style:--biss-sidebar-width={width + 'px'}
>
  <BissTopBar {brand} {mark} {icon} {iconLabel} {href} links={topLinks}
    >{#snippet actions()}{#if sidebar}<button
          type="button"
          class="biss-button biss-button-secondary biss-sidebar-toggle"
          aria-expanded={open}
          onclick={() => (open = !open)}>Menu</button
        >{/if}{@render topbarActions?.()}{/snippet}</BissTopBar
  >
  <div class="biss-app-body">
    {#if sidebar}{#if open}<button
          type="button"
          class="biss-sidebar-scrim"
          aria-label="Close navigation"
          onclick={() => (open = false)}
        ></button>{/if}
      <aside class="biss-app-sidebar" class:is-open={open}>
        <button
          type="button"
          class="biss-sidebar-collapse"
          aria-label={collapsed ? 'Expand the sidebar' : 'Collapse the sidebar'}
          aria-expanded={!collapsed}
          onclick={() => (collapsed = !collapsed)}
          ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"
            ><path d="m15 18-6-6 6-6" /></svg
          ></button
        >
        <div class="biss-sidebar-body">{@render sidebar()}</div>
        {#if sidebarFooter}<div class="biss-sidebar-footer">
            {@render sidebarFooter()}
          </div>{/if}<button
          type="button"
          class="biss-sidebar-resizer"
          aria-label="Resize the sidebar"
          use:resizeHandle={{
            value: width,
            min: 200,
            max: 460,
            onchange: (value: number) => (width = value),
          }}
        ></button>
      </aside>{/if}
    <main class="biss-app-main" class:is-fluid={fluid}>
      <div class="biss-app-main-inner">{@render children?.()}</div>
    </main>
  </div>
  {#if footer || footerContent}<BissBottomBar managedBy={footerText} links={footerLinks}
      >{#if footerContent}{@render footerContent()}{/if}</BissBottomBar
    >{/if}
</div>
