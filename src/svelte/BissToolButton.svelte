<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  let {
    label,
    icon = undefined,
    active = false,
    count = undefined,
    clearable = false,
    clearLabel = 'Clear',
    disabled = false,
    onclick,
    onclear,
  }: {
    label: string;
    icon?: BissIconName | undefined;
    active?: boolean;
    count?: number | undefined;
    clearable?: boolean;
    clearLabel?: string;
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    onclear?: () => void;
  } = $props();
  type Events = { click: [event: MouseEvent]; clear: [] };
  const handlers = {
    get click() {
      return onclick;
    },
    get clear() {
      return onclear;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<span class="biss-tool-button" data-active={active || !!count}
  ><button
    type="button"
    {disabled}
    aria-pressed={active || !!count}
    onclick={(e) => emit('click', e)}
    >{#if icon}<BissIcon name={icon} />{/if}<span>{label}</span>{#if count !== undefined}<small
        >{count}</small
      >{/if}</button
  >{#if clearable && (active || count)}<button
      type="button"
      aria-label={clearLabel}
      {disabled}
      onclick={() => emit('clear')}><BissIcon name="x" /></button
    >{/if}</span
>
