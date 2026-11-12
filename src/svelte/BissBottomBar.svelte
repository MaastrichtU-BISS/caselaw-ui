<script lang="ts">
  import type { BissLink } from "../tokens";

  export let managedBy = "Managed by BISS Institute.";
  export let links: BissLink[] = [];
</script>

<footer class="biss-fixed-bottombar">
  <div class="biss-footer-inner">
    <slot>
      <span>{managedBy}</span>
      {#each links as link}
        <a href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
          {link.label}
        </a>
      {/each}
    </slot>
  </div>
</footer>
