<script lang="ts">
  import type { Snippet } from 'svelte';
  import * as Tabs from './tabs';
  import {
    bissTabsTheme as theme,
    type BissTabsItem,
    type BissTabsSize,
    type BissTabsUi,
    type BissTabsVariant,
  } from '../theme/tabs';
  let {
    items,
    label,
    value = $bindable(),
    variant = 'line',
    size = 'md',
    activationMode = 'automatic',
    ui,
    onchange,
    children,
  }: {
    items: BissTabsItem[];
    /** Accessible name for the tab list. */
    label: string;
    value?: string;
    variant?: BissTabsVariant;
    size?: BissTabsSize;
    /** `automatic` selects on arrow-key focus; `manual` waits for Enter or Space. */
    activationMode?: 'automatic' | 'manual';
    ui?: BissTabsUi;
    onchange?: (value: string) => void;
    /** Renders each panel; receives the tab item. */
    children?: Snippet<[BissTabsItem]>;
  } = $props();
  const current = $derived(value ?? items.find((item) => !item.disabled)?.value ?? '');
  function select(next: string) {
    value = next;
    onchange?.(next);
  }
</script>

<Tabs.Root class="biss-tabs-root" value={current} onValueChange={select} {activationMode}>
  <Tabs.List aria-label={label} {variant} {size} class={ui?.list}>
    {#each items as item (item.value)}<Tabs.Trigger
        value={item.value}
        disabled={item.disabled}
        class={ui?.trigger}
        >{item.label}{#if item.count !== undefined}<span class={[theme.slots.count, ui?.count]}
            >{item.count}</span
          >{/if}</Tabs.Trigger
      >{/each}
  </Tabs.List>
  {#each items as item (item.value)}<Tabs.Content value={item.value} class={ui?.content}
      >{@render children?.(item)}</Tabs.Content
    >{/each}
</Tabs.Root>
