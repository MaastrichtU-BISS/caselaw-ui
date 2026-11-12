<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
  let {
    href,
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    onclick,
    block = false,
    icon = false,
    children,
    class: className = '',
    ...rest
  }: Omit<HTMLButtonAttributes, 'type'> & {
    loading?: boolean;
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
    href={disabled || loading ? undefined : href}
    tabindex={disabled || loading ? -1 : rest.tabindex}
    aria-disabled={disabled || loading || undefined}
    aria-busy={loading || undefined}
    onclick={(e) => {
      if (disabled || loading) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      onclick?.(e as any);
    }}
    >{#if loading}<span class="biss-button-spinner" aria-hidden="true"></span>{/if}<span
      class="biss-button-label"
      style:opacity={loading ? 0 : undefined}>{@render children?.()}</span
    ></a
  >{:else}<button
    {...rest}
    class={classes}
    {type}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    {onclick}
    >{#if loading}<span class="biss-button-spinner" aria-hidden="true"></span>{/if}<span
      class="biss-button-label"
      style:opacity={loading ? 0 : undefined}>{@render children?.()}</span
    ></button
  >{/if}
