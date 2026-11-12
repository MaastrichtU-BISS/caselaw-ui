<script lang="ts">
  interface Props {
    /**
     * A card that is the action, not a card with an action inside it.
     *
     * BissFeatureCard describes something; this one goes somewhere. The whole
     * surface is the target, which is what makes a grid of these readable as a
     * set of choices rather than as prose with links buried in it.
     *
     * The icon is a slot rather than a name from the service set, because the
     * choices a product offers are its own and will not be in a shared
     * enumeration.
     */
    href: string;
    title: string;
    copy?: string;
    /** Marks the current choice when the set doubles as navigation. */
    active?: boolean;
    icon?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { href, title, copy = '', active = false, icon, children, ...rest }: Props = $props();
</script>

<a class="biss-action-card" class:is-active={active} {href} {...rest}>
  {#if icon}
    <span class="biss-action-card-icon">{@render icon?.()}</span>
  {/if}
  <span class="biss-action-card-title">{title}</span>
  <span class="biss-action-card-copy"
    >{#if children}{@render children()}{:else}{copy}{/if}</span
  >
</a>
