<script lang="ts">
  import type { BissLink } from '../tokens';

  interface Props {
    managedBy?: string;
    links?: BissLink[];
    children?: import('svelte').Snippet;
  }

  let { managedBy = 'Managed by BISS Institute.', links = [], children }: Props = $props();
</script>

<footer class="biss-fixed-bottombar">
  <div class="biss-footer-inner">
    {#if children}{@render children()}{:else}
      <span>{managedBy}</span>
      {#each links as link}
        <a
          href={link.href}
          target={link.newTab ? '_blank' : undefined}
          rel={link.external ? 'noreferrer' : undefined}
        >
          {link.label}
        </a>
      {/each}
    {/if}
  </div>
</footer>
