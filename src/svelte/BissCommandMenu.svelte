<script lang="ts">
  /**
   * An inline, keyboard-driven command list for slash commands and mention pickers.
   * The host owns the typed text (`query`) and where the list sits; the list owns the
   * active row. A host textarea keeps focus and forwards keys to the exported
   * `handleKey(event)` (via `bind:this`), pointing its `aria-activedescendant` at the
   * bindable `activeId`. With `searchable`, the list has its own search field instead.
   */
  import { onMount, tick, type Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import {
    filterCommands,
    flattenGroups,
    groupCommands,
    initialActive,
    moveActive,
    type BissCommand,
    type BissCommandStep,
  } from '../core/commands';

  interface Props {
    items: BissCommand[];
    /** The typed text. Bind it, or pass it one-way from a host editor. */
    query?: string;
    /** Accessible name of the list. */
    label?: string;
    /** Show a search field in the list, for menus opened from a button. */
    searchable?: boolean;
    searchLabel?: string;
    /** Shown when nothing matches. `{query}` is replaced. */
    emptyLabel?: string;
    /** Group rows under their headings while nothing is typed. */
    grouped?: boolean;
    /** Show the keyboard hint below the list. */
    hint?: boolean;
    moveLabel?: string;
    chooseLabel?: string;
    closeLabel?: string;
    /** Screen-reader text for a checked command. */
    checkedLabel?: string;
    /** Focus the search field (or the list) when mounted. */
    autofocus?: boolean;
    /** The active row's id (read it with `bind:activeId`) for a host field's `aria-activedescendant`. */
    activeId?: string;
    onpick?: (item: BissCommand) => void;
    onclose?: () => void;
    leading?: Snippet<[BissCommand]>;
    empty?: Snippet<[string]>;
  }

  let {
    items,
    query = $bindable(''),
    label = 'Commands',
    searchable = false,
    searchLabel = 'Search commands',
    emptyLabel = 'Nothing matches “{query}”',
    grouped = true,
    hint = true,
    moveLabel = 'to move',
    chooseLabel = 'to choose',
    closeLabel = 'to close',
    checkedLabel = 'Current',
    autofocus = false,
    activeId = $bindable(),
    onpick,
    onclose,
    leading,
    empty,
  }: Props = $props();

  const uid = $props.id();
  export const listId = uid + '-list';
  let list = $state<HTMLElement | null>(null);
  let field = $state<HTMLInputElement | null>(null);
  const typed = $derived(query.trim());
  const groups = $derived(groupCommands(filterCommands(items, typed), !grouped || !!typed));
  const flat = $derived(flattenGroups(groups));
  let active = $state(-1);
  const optionId = (index: number) => `${uid}-option-${index}`;
  const emptyText = $derived(emptyLabel.replace('{query}', typed));

  $effect.pre(() => {
    active = initialActive(flat);
  });
  $effect(() => {
    activeId = active >= 0 ? optionId(active) : undefined;
    if (active < 0) return;
    const id = optionId(active);
    tick().then(() =>
      list?.querySelector(`[id="${id}"]`)?.scrollIntoView?.({ block: 'nearest' }),
    );
  });

  export function move(step: BissCommandStep) {
    active = moveActive(flat, active, step);
  }
  export function choose(index = active) {
    const item = flat[index];
    if (!item || item.disabled) return;
    onpick?.(item);
  }
  /** Handle a navigation key; returns true when the key was used. */
  export function handleKey(event: KeyboardEvent): boolean {
    const target = event.target as HTMLElement | null;
    const typing = !!target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
    if (event.key === 'ArrowDown') move(1);
    else if (event.key === 'ArrowUp') move(-1);
    else if (event.key === 'Home' && !typing) move('first');
    else if (event.key === 'End' && !typing) move('last');
    else if (event.key === 'Enter') {
      if (event.isComposing) return false;
      choose();
    } else if (event.key === 'Escape') onclose?.();
    else return false;
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
  export function focus() {
    (searchable ? field : list)?.focus({ preventScroll: true });
  }
  onMount(() => {
    if (autofocus) focus();
  });
</script>

<div class="biss-command-menu" data-searchable={searchable || undefined}>
  {#if searchable}
    <div class="biss-command-search">
      <BissIcon name="search" />
      <input
        bind:this={field}
        bind:value={query}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-label={searchLabel}
        placeholder={searchLabel}
        autocomplete="off"
        spellcheck="false"
        onkeydown={handleKey}
      />
    </div>
  {/if}
  <div
    id={listId}
    bind:this={list}
    class="biss-command-list"
    role="listbox"
    aria-label={label}
    aria-activedescendant={searchable ? undefined : activeId}
    tabindex={searchable ? -1 : 0}
    onkeydown={handleKey}
    onmousedown={(event) => event.preventDefault()}
  >
    {#each groups as group, g (group.name || '_')}
      <div
        role="group"
        aria-labelledby={group.name ? `${uid}-group-${g}` : undefined}
        aria-label={group.name ? undefined : label}
      >
        {#if group.name}<p id={`${uid}-group-${g}`} class="biss-command-heading">
            {group.name}
          </p>{/if}
        {#each group.items as { item, index } (item.key)}
          <div
            id={optionId(index)}
            class="biss-command-option"
            role="option"
            tabindex="-1"
            aria-selected={index === active}
            aria-disabled={item.disabled || undefined}
            data-active={index === active || undefined}
            onpointermove={() => {
              if (!item.disabled && active !== index) active = index;
            }}
            onclick={() => choose(index)}
            onkeydown={handleKey}
          >
            {#if leading}{@render leading(item)}{:else if item.icon}<span class="biss-command-icon"
                ><BissIcon name={item.icon} /></span
              >{/if}
            <span class="biss-command-text"
              ><span class="biss-command-label">{item.label}</span>{#if item.description}<small
                  >{item.description}</small
                >{/if}</span
            >
            {#if !group.name && typed && item.group}<small class="biss-command-group"
                >{item.group}</small
              >{/if}
            {#if item.shortcut}<kbd>{item.shortcut}</kbd>{/if}
            {#if item.checked}<span class="biss-command-check"
                ><BissIcon name="check" /><span class="biss-visually-hidden">{checkedLabel}</span
                ></span
              >{/if}
          </div>
        {/each}
      </div>
    {/each}
    {#if !flat.length}
      <p class="biss-command-empty" role="status">
        {#if empty}{@render empty(typed)}{:else}{emptyText}{/if}
      </p>
    {/if}
  </div>
  {#if hint}
    <p class="biss-command-hint" aria-hidden="true">
      <kbd>↑</kbd><kbd>↓</kbd>
      {moveLabel} · <kbd>↵</kbd>
      {chooseLabel} · <kbd>Esc</kbd>
      {closeLabel}
    </p>
  {/if}
</div>
