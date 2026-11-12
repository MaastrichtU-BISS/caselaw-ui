<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { tick } from 'svelte';
  let {
    value = $bindable(''),
    label = 'Search',
    placeholder = 'Search…',
    clearLabel = 'Clear search',
    shortcut = false,
    onchange,
  }: {
    value?: string;
    label?: string;
    placeholder?: string;
    clearLabel?: string;
    shortcut?: boolean;
    onchange?: (value: string) => void;
  } = $props();
  type Events = { change: [value: string] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let expanded = $state(false);
  let input: HTMLInputElement | null = $state(null);
  $effect(() => {
    function key(e: KeyboardEvent) {
      if (
        shortcut &&
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(e.target as HTMLElement).closest('input,textarea,[contenteditable]')
      ) {
        e.preventDefault();
        expanded = true;
        tick().then(() => input?.focus());
      }
    }
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  });
</script>

<span class="biss-tool-search"
  >{#if !expanded && !value}<button
      type="button"
      class="biss-text-button"
      onclick={async () => {
        expanded = true;
        await tick();
        input?.focus();
      }}><BissIcon name="search" />{label}</button
    >{:else}<BissIcon name="search" /><input
      bind:this={input}
      {value}
      aria-label={label}
      {placeholder}
      oninput={(e) => {
        value = e.currentTarget.value;
        emit('change', value);
      }}
      onkeydown={(e) => {
        if (e.key === 'Escape') {
          value = '';
          emit('change', '');
          expanded = false;
        }
      }}
    /><button
      type="button"
      class="biss-header-action"
      aria-label={clearLabel}
      onclick={() => {
        value = '';
        emit('change', '');
        expanded = false;
      }}><BissIcon name="x" /></button
    >{/if}</span
>
