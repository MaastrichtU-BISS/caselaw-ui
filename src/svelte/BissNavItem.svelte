<script lang="ts">
  interface Props {
    /**
     * Renders as an <a> by default. Pass `as` to use a framework link component;
     * remaining attributes are forwarded to it.
     */
    href?: string | undefined;
    label: string;
    meta?: string | number | undefined;
    active?: boolean;
    icon?: import('svelte').Snippet;
    [key: string]: any;
  }

  let {
    href = undefined,
    label,
    meta = undefined,
    active = false,
    icon,
    ...rest
  }: Props = $props();
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
  {...rest}
  onclick={rest.onclick}
  onkeydown={rest.onkeydown}
  onfocus={rest.onfocus}
  onblur={rest.onblur}
>
  {#if icon}
    <span class="biss-nav-item-icon">{@render icon?.()}</span>
  {/if}
  <span class="biss-nav-item-label">{label}</span>
  {#if meta !== undefined && meta !== ''}
    <span class="biss-nav-item-meta">{meta}</span>
  {/if}
</a>
