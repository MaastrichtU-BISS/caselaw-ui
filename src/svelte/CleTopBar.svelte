<script lang="ts">
  import type { CleLink } from "../tokens";

  export let brand = "Case Law Explorer";
  export let mark = "CLE";
  export let href = "/";
  export let links: CleLink[] = [];
</script>

<header class="cle-fixed-topbar">
  <div class="cle-bar-inner">
    <a class="cle-brand" {href}>
      <span class="cle-brand-mark">{mark}</span>
      <span>{brand}</span>
    </a>
    {#if links.length}
      <nav class="cle-link-row" aria-label="Primary">
        {#each links as link}
          <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
            {link.label}
          </a>
        {/each}
      </nav>
    {/if}
  </div>
</header>
