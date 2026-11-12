<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    title,
    open = $bindable(false),
    onchange,
    children,
  }: {
    title: string;
    open?: boolean;
    onchange?: (value: boolean) => void;
    children?: Snippet;
  } = $props();
  type Events = { change: [value: boolean] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  const uid = $props.id();
</script>

<div class="biss-disclosure">
  <button
    type="button"
    class="biss-disclosure-head"
    aria-expanded={open}
    aria-controls={uid}
    onclick={() => {
      open = !open;
      emit('change', open);
    }}><BissIcon name={open ? 'chevLeft' : 'chev'} />{title}</button
  >{#if open}<div id={uid} class="biss-disclosure-body">
      {#if children}{@render children()}{/if}
    </div>{/if}
</div>
