<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Accordion } from 'bits-ui';
  import BissIcon from './BissIcon.svelte';
  import type { BissAccordionItem } from '../core/types';
  let {
    items,
    type = 'single',
    value = $bindable(),
    collapsible = true,
    disabled = false,
    headingLevel = 3,
    onchange,
    children,
  }: {
    items: BissAccordionItem[];
    /** `single` keeps one section open; `multiple` lets several stay open. */
    type?: 'single' | 'multiple';
    value?: string | string[];
    /** In single mode, allow closing the open section again. */
    collapsible?: boolean;
    disabled?: boolean;
    /** Heading level of each section title, to fit the page outline. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    onchange?: (value: string | string[]) => void;
    /** Renders each section body; receives the item. Falls back to `item.content`. */
    children?: Snippet<[BissAccordionItem]>;
  } = $props();
  let local = $state<string | string[] | undefined>(undefined);
  const current = $derived(value ?? local);
  const single = $derived(typeof current === 'string' ? current : (current?.[0] ?? ''));
  const multiple = $derived(Array.isArray(current) ? current : current ? [current] : []);
  function update(next: string | string[]) {
    if (type === 'single' && !collapsible && next === '') return;
    local = next;
    value = next;
    onchange?.(next);
  }
</script>

{#snippet sections()}
  {#each items as item (item.value)}<Accordion.Item
      value={item.value}
      disabled={item.disabled}
      class="biss-accordion-item"
      ><Accordion.Header level={headingLevel} class="biss-accordion-header"
        ><Accordion.Trigger class="biss-accordion-trigger"
          ><span class="biss-accordion-title"
            >{item.title}{#if item.description}<small class="biss-accordion-description"
                >{item.description}</small
              >{/if}</span
          ><BissIcon name="chev" /></Accordion.Trigger
        ></Accordion.Header
      ><Accordion.Content class="biss-accordion-content"
        ><div class="biss-accordion-body">
          {#if children}{@render children(item)}{:else}{item.content ?? ''}{/if}
        </div></Accordion.Content
      ></Accordion.Item
    >{/each}
{/snippet}

{#if type === 'multiple'}<Accordion.Root
    class="biss-accordion"
    type="multiple"
    {disabled}
    bind:value={() => multiple, update}>{@render sections()}</Accordion.Root
  >{:else}<Accordion.Root
    class="biss-accordion"
    type="single"
    {disabled}
    bind:value={() => single, update}>{@render sections()}</Accordion.Root
  >{/if}
