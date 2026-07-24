<script lang="ts">
  import type { CleServiceIconName } from "../icons";
  import type { CleLink } from "../tokens";
  import CleServiceIcon from "./CleServiceIcon.svelte";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let icon: CleServiceIconName | undefined = undefined;
  export let iconLabel: string | undefined = undefined;
  export let href = "/";
  export let links: CleLink[] = [];
</script>

<header class="cle-fixed-topbar">
  <div class="cle-bar-inner">
    <a class="cle-brand" {href} aria-label={brand}>
      <slot name="icon">
        <CleServiceIcon {icon} {mark} label={iconLabel} />
      </slot>
      <span class="cle-brand-text">{brand}</span>
    </a>
    <div class="cle-topbar-right">
      {#if links.length}
        <nav class="cle-link-row" aria-label="Primary">
          {#each links as link}
            <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
      <div class="cle-topbar-actions">
        <slot name="actions" />
        <slot />
      </div>
    </div>
  </div>
</header>
