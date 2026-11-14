<script lang="ts">
  /**
   * Choose a starting template: filter by category or search, pick a card, check
   * what it sets up in the preview, then use it. The host owns the templates and
   * performs the setup: `onuse` receives the chosen template, `onblank` starts empty.
   */
  import { tick, type Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import BissButton from './BissButton.svelte';
  import {
    BISS_ALL_TEMPLATES,
    filterTemplates,
    gridStep,
    templateCategories,
    type BissTemplate,
    type BissTemplateCategory,
  } from '../core/templates';
  import { fillLabel } from '../core/blocks';

  interface Props {
    templates: BissTemplate[];
    /** Category labels and order. Defaults to the categories the templates use. */
    categories?: BissTemplateCategory[];
    selected?: string | null;
    category?: string;
    /** Shows a “Start blank” action beside “Use template”. */
    blank?: boolean;
    /** The use action is running: the button shows progress and ignores clicks. */
    busy?: boolean;
    label?: string;
    searchLabel?: string;
    allLabel?: string;
    categoryLabel?: string;
    useLabel?: string;
    blankLabel?: string;
    includesLabel?: string;
    /** `{query}` is replaced. */
    emptyTitle?: string;
    emptyCopy?: string;
    clearLabel?: string;
    previewEmpty?: string;
    onuse?: (template: BissTemplate) => void;
    onblank?: () => void;
    onselect?: (id: string) => void;
    preview?: Snippet<[BissTemplate]>;
  }

  let {
    templates,
    categories,
    selected = $bindable(null),
    category = $bindable(BISS_ALL_TEMPLATES),
    blank = false,
    busy = false,
    label = 'Templates',
    searchLabel = 'Search templates',
    allLabel = 'All',
    categoryLabel = 'Category',
    useLabel = 'Use template',
    blankLabel = 'Start blank',
    includesLabel = 'Includes',
    emptyTitle = 'No templates match “{query}”',
    emptyCopy = 'Try another word, or look in all categories.',
    clearLabel = 'Clear search',
    previewEmpty = 'Choose a template to see what it sets up.',
    onuse,
    onblank,
    onselect,
    preview,
  }: Props = $props();

  const uid = $props.id();
  let query = $state('');
  let grid = $state<HTMLElement | null>(null);
  const chips = $derived(templateCategories(templates, categories, allLabel));
  const categoryName = (value?: string) =>
    chips.find((c) => c.value === value)?.label ?? value ?? '';
  const shown = $derived(filterTemplates(templates, { category, query }));
  const current = $derived(templates.find((t) => t.id === selected) ?? null);
  const focusId = $derived(shown.some((t) => t.id === selected) ? selected : shown[0]?.id);
  $effect(() => {
    if (!chips.some((c) => c.value === category)) category = BISS_ALL_TEMPLATES;
  });

  function choose(id: string) {
    selected = id;
    onselect?.(id);
  }
  function columns() {
    const cards = grid?.querySelectorAll<HTMLElement>('[role=radio]');
    if (!cards?.length) return 1;
    const top = cards[0]!.offsetTop;
    let n = 0;
    for (const card of cards) {
      if (card.offsetTop !== top) break;
      n++;
    }
    return n;
  }
  async function onKey(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const t = shown[index];
      if (t && !busy) {
        choose(t.id);
        onuse?.(t);
      }
      return;
    }
    const next = gridStep(index, shown.length, event.key, columns());
    if (next === index || next < 0) return;
    event.preventDefault();
    choose(shown[next]!.id);
    await tick();
    grid?.querySelectorAll<HTMLElement>('[role=radio]')[next]?.focus();
  }
  function use() {
    if (current && !busy) onuse?.(current);
  }
</script>

<section class="biss-template-gallery" aria-label={label}>
  <div class="biss-template-gallery-tools">
    <div class="biss-template-gallery-chips" role="group" aria-label={categoryLabel}>
      {#each chips as chip (chip.value)}<button
          type="button"
          aria-pressed={category === chip.value}
          onclick={() => (category = chip.value)}>{chip.label}<small>{chip.count}</small></button
        >{/each}
    </div>
    <label class="biss-template-gallery-search"
      ><BissIcon name="search" /><input
        bind:value={query}
        type="search"
        placeholder={searchLabel}
        aria-label={searchLabel}
        aria-controls={uid + '-grid'}
      /></label
    >
  </div>
  <div class="biss-template-gallery-body">
    {#if shown.length}
      <div
        id={uid + '-grid'}
        bind:this={grid}
        class="biss-template-gallery-grid"
        role="radiogroup"
        aria-label={label}
      >
        {#each shown as t, index (t.id)}
          <button
            type="button"
            role="radio"
            class="biss-template-card"
            aria-checked={selected === t.id}
            tabindex={focusId === t.id ? 0 : -1}
            onclick={() => choose(t.id)}
            ondblclick={() => !busy && onuse?.(t)}
            onkeydown={(e) => onKey(e, index)}
          >
            <span class="biss-template-card-icon"><BissIcon name={t.icon ?? 'layout'} /></span>
            <span class="biss-template-card-text">
              <b>{t.name}</b>
              {#if t.description}<small>{t.description}</small>{/if}
            </span>
            <span class="biss-template-card-meta"
              >{#if t.category}<span>{categoryName(t.category)}</span>{/if}{#if t.badge}<em
                  >{t.badge}</em
                >{/if}</span
            >
            {#if selected === t.id}<span class="biss-template-card-check" aria-hidden="true"
                ><BissIcon name="check" /></span
              >{/if}
          </button>
        {/each}
      </div>
    {:else}
      <div id={uid + '-grid'} class="biss-template-gallery-empty" role="status">
        <BissIcon name="search" /><strong>{fillLabel(emptyTitle, { query })}</strong><span
          >{emptyCopy}</span
        >
        <BissButton
          variant="secondary"
          size="sm"
          onclick={() => {
            query = '';
            category = BISS_ALL_TEMPLATES;
          }}>{clearLabel}</BissButton
        >
      </div>
    {/if}
    <aside class="biss-template-preview" aria-labelledby={uid + '-preview'} aria-live="polite">
      {#if current}
        {#if current.image}<img src={current.image} alt="" class="biss-template-preview-image" />{/if}
        <div class="biss-template-preview-head">
          <span class="biss-template-card-icon"><BissIcon name={current.icon ?? 'layout'} /></span>
          <div>
            <h3 id={uid + '-preview'}>{current.name}</h3>
            {#if current.category}<small>{categoryName(current.category)}</small>{/if}
          </div>
        </div>
        {#if current.description}<p>{current.description}</p>{/if}
        {#if current.includes?.length}
          <h4>{includesLabel}</h4>
          <ul>
            {#each current.includes as part (part)}<li><BissIcon name="check" />{part}</li>{/each}
          </ul>
        {/if}
        {@render preview?.(current)}
      {:else}
        <p id={uid + '-preview'} class="biss-template-preview-empty">{previewEmpty}</p>
      {/if}
      <div class="biss-template-preview-actions">
        {#if blank}<BissButton variant="ghost" onclick={() => onblank?.()}>{blankLabel}</BissButton
          >{/if}
        <BissButton disabled={!current} loading={busy} onclick={use}>{useLabel}</BissButton>
      </div>
    </aside>
  </div>
</section>
