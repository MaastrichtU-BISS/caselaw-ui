<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { modal } from '../core/dom';

  let {
    open = $bindable(false),
    title,
    description = undefined,
    width = 520,
    closeLabel = 'Close',
    busy = false,
    onclose,
    children,
    actions,
  }: {
    open?: boolean;
    title: string;
    description?: string | undefined;
    width?: number;
    closeLabel?: string;
    busy?: boolean;
    onclose?: () => void;
    children?: Snippet;
    actions?: Snippet;
  } = $props();
  type Events = { close: [] };
  const handlers = {
    get close() {
      return onclose;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<dialog
  class="biss-native-dialog"
  use:modal={{
    open,
    busy,
    onclose: () => {
      open = false;
      emit('close');
    },
  }}
  aria-label={title}
  aria-busy={busy}
  style:--dialog-width={width + 'px'}
>
  <header>
    <div class="biss-grow">
      <h2>{title}</h2>
      {#if description}<p>{description}</p>{/if}
    </div>
    <button
      type="button"
      class="biss-header-action"
      disabled={busy}
      aria-label={closeLabel}
      onclick={() => {
        open = false;
        emit('close');
      }}><BissIcon name="x" /></button
    >
  </header>
  <div class="biss-dialog-body">
    {#if children}{@render children()}{/if}
  </div>
  {#if actions}<footer>{@render actions()}</footer>{/if}
</dialog>
