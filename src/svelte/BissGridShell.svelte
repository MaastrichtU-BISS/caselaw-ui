<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import type { BissLink } from '../tokens';
  import type { BissServiceIconName } from '../core/service-icons';
  import { setBissFavicon } from '../core/service-icons';
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
    footerText = 'Managed by BISS Institute.',
    footerLinks = [],
    children,
    actions,
  }: {
    brand?: string;
    mark?: string;
    icon?: BissServiceIconName;
    iconLabel?: string;
    href?: string;
    favicon?: boolean;
    topLinks?: BissLink[];
    footerText?: string;
    footerLinks?: BissLink[];
    children?: Snippet;
    actions?: Snippet;
  } = $props();
  onMount(() => {
    if (favicon && icon) setBissFavicon(icon);
  });
</script>

<div class="biss-grid-shell">
  <BissTopBar {brand} {mark} {icon} {iconLabel} {href} links={topLinks} {actions} />
  <main class="biss-page">{@render children?.()}</main>
  <BissBottomBar managedBy={footerText} links={footerLinks} />
</div>
