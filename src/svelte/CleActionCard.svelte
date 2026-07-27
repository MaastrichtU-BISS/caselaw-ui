<script lang="ts">
  /**
   * A card that is the action, not a card with an action inside it.
   *
   * CleFeatureCard describes something; this one goes somewhere. The whole
   * surface is the target, which is what makes a grid of these readable as a
   * set of choices rather than as prose with links buried in it.
   *
   * The icon is a slot rather than a name from the service set, because the
   * choices a product offers are its own and will not be in a shared
   * enumeration.
   */
  export let href: string;
  export let title: string;
  export let copy = "";
  /** Marks the current choice when the set doubles as navigation. */
  export let active = false;
</script>

<a class="cle-action-card" class:is-active={active} {href} {...$$restProps}>
  {#if $$slots.icon}
    <span class="cle-action-card-icon"><slot name="icon" /></span>
  {/if}
  <span class="cle-action-card-title">{title}</span>
  <span class="cle-action-card-copy"><slot>{copy}</slot></span>
</a>
