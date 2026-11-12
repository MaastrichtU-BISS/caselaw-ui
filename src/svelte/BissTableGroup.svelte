<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    label,
    count = undefined,
    color = 'var(--biss-primary)',
    collapsed = $bindable(false),
    ontoggle,
    children,
    actions,
  }: {
    label: string;
    count?: number | undefined;
    color?: string;
    collapsed?: boolean;
    ontoggle?: (collapsed: boolean) => void;
    children?: Snippet;
    actions?: Snippet;
  } = $props();
  type Events = { toggle: [collapsed: boolean] };
  const handlers = {
    get toggle() {
      return ontoggle;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-table-group">
  <header>
    <button
      type="button"
      aria-expanded={!collapsed}
      onclick={() => {
        collapsed = !collapsed;
        emit('toggle', collapsed);
      }}
      ><BissIcon name={collapsed ? 'chev' : 'chevLeft'} /><i style:background={color}
      ></i>{label}{#if count !== undefined}<small>{count}</small>{/if}</button
    >{#if actions}{@render actions()}{/if}
  </header>
  {#if !collapsed}<div>
      {#if children}{@render children()}{/if}
    </div>{/if}
</section>
