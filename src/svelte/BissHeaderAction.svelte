<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  let {
    label,
    icon = undefined,
    href = undefined,
    pressed = undefined,
    disabled = false,
    shortcut = undefined,
    onclick,
    children,
  }: {
    label: string;
    icon?: BissIconName | undefined;
    href?: string | undefined;
    pressed?: boolean | undefined;
    disabled?: boolean;
    shortcut?: string | undefined;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
  } = $props();
  type Events = { click: [event: MouseEvent] };
  const handlers = {
    get click() {
      return onclick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

{#if href && !disabled}<a
    class="biss-header-action"
    {href}
    aria-label={label}
    title={label}
    onclick={(e) => emit('click', e)}
    >{#if children}{@render children()}{:else if icon}<BissIcon name={icon} />{/if}</a
  >{:else}<button
    type="button"
    class="biss-header-action"
    {disabled}
    aria-label={label}
    title={label}
    aria-pressed={pressed}
    aria-keyshortcuts={shortcut}
    onclick={(e) => emit('click', e)}
    >{#if children}{@render children()}{:else if icon}<BissIcon name={icon} />{/if}</button
  >{/if}
