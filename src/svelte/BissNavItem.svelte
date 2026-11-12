<script lang="ts">
  /**
   * Renders as an <a> by default. Pass `as` to use a framework link component;
   * remaining attributes are forwarded to it.
   */
  export let href: string | undefined = undefined;
  export let label: string;
  export let meta: string | number | undefined = undefined;
  export let active = false;
</script>

<!--
  Events are forwarded explicitly. $$restProps carries attributes but not
  listeners, so without these a caller's on:click is accepted silently and
  never fires — the nav item still navigates via href, which makes the
  dropped handler look like it ran. The Vue mirror forwards listeners through
  $attrs already, so this only closes the gap on the Svelte side.
-->
<a
  class="biss-nav-item"
  class:is-active={active}
  {href}
  {...$$restProps}
  on:click
  on:keydown
  on:focus
  on:blur>
  {#if $$slots.icon}
    <span class="biss-nav-item-icon"><slot name="icon" /></span>
  {/if}
  <span class="biss-nav-item-label">{label}</span>
  {#if meta !== undefined && meta !== ""}
    <span class="biss-nav-item-meta">{meta}</span>
  {/if}
</a>
