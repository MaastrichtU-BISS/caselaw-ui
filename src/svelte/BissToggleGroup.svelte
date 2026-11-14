<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import BissIcon from './BissIcon.svelte';
  import type { BissToggleItem } from '../core/types';
  let {
    items,
    label,
    value = $bindable(),
    type = 'single',
    iconOnly = false,
    size = 'md',
    disabled = false,
    orientation = 'horizontal',
    onchange,
  }: {
    items: BissToggleItem[];
    /** Accessible name for the group. */
    label: string;
    value?: string | string[];
    /** `single` presses one option at a time; `multiple` toggles each option. */
    type?: 'single' | 'multiple';
    /** Show icons only; each item's label becomes its accessible name. */
    iconOnly?: boolean;
    size?: 'sm' | 'md';
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    onchange?: (value: string | string[]) => void;
  } = $props();
  let local = $state<string | string[] | undefined>(undefined);
  const current = $derived(value ?? local);
  const single = $derived(typeof current === 'string' ? current : (current?.[0] ?? ''));
  const multiple = $derived(Array.isArray(current) ? current : current ? [current] : []);
  function update(next: string | string[]) {
    local = next;
    value = next;
    onchange?.(next);
  }
</script>

{#snippet options()}
  {#each items as item (item.value)}<ToggleGroup.Item
      class="biss-toggle-item"
      value={item.value}
      disabled={item.disabled}
      aria-label={iconOnly ? item.label : undefined}
      title={iconOnly ? item.label : undefined}
      >{#if item.icon}<BissIcon name={item.icon} />{/if}{#if !iconOnly || !item.icon}<span
          >{item.label}</span
        >{/if}</ToggleGroup.Item
    >{/each}
{/snippet}

{#if type === 'multiple'}<ToggleGroup.Root
    class="biss-toggle-group"
    type="multiple"
    aria-label={label}
    data-size={size}
    data-icon-only={iconOnly || undefined}
    {disabled}
    {orientation}
    bind:value={() => multiple, update}>{@render options()}</ToggleGroup.Root
  >{:else}<ToggleGroup.Root
    class="biss-toggle-group"
    type="single"
    aria-label={label}
    data-size={size}
    data-icon-only={iconOnly || undefined}
    {disabled}
    {orientation}
    bind:value={() => single, update}>{@render options()}</ToggleGroup.Root
  >{/if}
