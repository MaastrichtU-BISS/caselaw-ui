<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissServiceIconName } from '../core/service-icons';
  import type { BissLink } from '../tokens';
  import BissServiceIcon from './BissServiceIcon.svelte';
  let {
    brand = 'Workspace',
    mark = 'B',
    icon,
    iconLabel,
    href = '/',
    links = [],
    iconContent,
    actions,
    children,
  }: {
    brand?: string;
    mark?: string;
    icon?: BissServiceIconName;
    iconLabel?: string;
    href?: string;
    links?: BissLink[];
    iconContent?: Snippet;
    actions?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<header class="biss-fixed-topbar">
  <div class="biss-bar-inner">
    <a class="biss-brand" {href} aria-label={brand}
      >{#if iconContent}{@render iconContent()}{:else}<BissServiceIcon
          {icon}
          {mark}
          label={iconLabel}
        />{/if}<span class="biss-brand-text">{brand}</span></a
    >
    <div class="biss-topbar-right">
      {#if links.length}<nav class="biss-link-row" aria-label="Primary">
          {#each links as link}<a
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}>{link.label}</a
            >{/each}
        </nav>{/if}
      <div class="biss-topbar-actions">{@render actions?.()}{@render children?.()}</div>
    </div>
  </div>
</header>
