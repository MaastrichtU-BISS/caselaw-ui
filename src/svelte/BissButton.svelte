<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
  let {
    href,
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    block = false,
    icon = false,
    children,
    class: className = '',
    ...rest
  }: Omit<HTMLButtonAttributes, 'type'> & {
    href?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-quiet';
    size?: 'md' | 'sm';
    type?: 'button' | 'submit' | 'reset';
    block?: boolean;
    icon?: boolean;
    children?: Snippet;
  } = $props();
  let classes = $derived(
    [
      'biss-button',
      variant !== 'primary' ? 'biss-button-' + variant : '',
      size === 'sm' ? 'biss-button-sm' : '',
      block ? 'biss-button-block' : '',
      icon ? 'biss-button-icon' : '',
      className,
    ]
      .filter(Boolean)
      .join(' '),
  );
</script>

{#if href}<a
    {...rest as HTMLAnchorAttributes}
    class={classes}
    href={disabled ? undefined : href}
    tabindex={disabled ? -1 : rest.tabindex}
    aria-disabled={disabled || undefined}>{@render children?.()}</a
  >{:else}<button {...rest} class={classes} {type} {disabled}>{@render children?.()}</button>{/if}
