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

<a class="cle-nav-item" class:is-active={active} {href} {...$$restProps}>
  {#if $$slots.icon}
    <span class="cle-nav-item-icon"><slot name="icon" /></span>
  {/if}
  <span class="cle-nav-item-label">{label}</span>
  {#if meta !== undefined && meta !== ""}
    <span class="cle-nav-item-meta">{meta}</span>
  {/if}
</a>
