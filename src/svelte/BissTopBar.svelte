<script lang="ts">
  import type { BissServiceIconName } from "../icons";
  import type { BissLink } from "../tokens";
  import BissServiceIcon from "./BissServiceIcon.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let icon: BissServiceIconName | undefined = undefined;
  export let iconLabel: string | undefined = undefined;
  export let href = "/";
  export let links: BissLink[] = [];
</script>

<header class="biss-fixed-topbar">
  <div class="biss-bar-inner">
    <a class="biss-brand" {href} aria-label={brand}>
      <slot name="icon">
        <BissServiceIcon {icon} {mark} label={iconLabel} />
      </slot>
      <span class="biss-brand-text">{brand}</span>
    </a>
    <div class="biss-topbar-right">
      {#if links.length}
        <nav class="biss-link-row" aria-label="Primary">
          {#each links as link}
            <a href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
      <div class="biss-topbar-actions">
        <slot name="actions" />
        <slot />
      </div>
    </div>
  </div>
</header>
