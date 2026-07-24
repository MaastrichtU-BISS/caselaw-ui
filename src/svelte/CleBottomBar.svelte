<script lang="ts">
  import type { CleLink } from "../tokens";

  export let managedBy = "Managed by BISS Institute.";
  export let links: CleLink[] = [];
</script>

<footer class="cle-fixed-bottombar">
  <div class="cle-footer-inner">
    <slot>
      <span>{managedBy}</span>
      {#each links as link}
        <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
          {link.label}
        </a>
      {/each}
    </slot>
  </div>
</footer>
