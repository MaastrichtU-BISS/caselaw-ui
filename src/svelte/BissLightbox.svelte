<script lang="ts">
  /**
   * View images large, over the page. ←/→ step through them, Home/End jump to the
   * first and last, Escape or the close button closes and focus returns to what
   * opened it. The host opens it and may bind the current index.
   */
  import type { Snippet } from 'svelte';
  import * as Dialog from './dialog';
  import BissIcon from './BissIcon.svelte';
  import { wrapIndex, type BissLightboxImage } from '../core/templates';
  import { fillLabel } from '../core/blocks';

  interface Props {
    images: BissLightboxImage[];
    open?: boolean;
    index?: number;
    /** Wrap from the last image to the first and back. */
    loop?: boolean;
    /** Show the strip of thumbnails when there is more than one image. */
    thumbnails?: boolean;
    /** Render in `<body>`, outside clipping ancestors. */
    portal?: boolean;
    label?: string;
    closeLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    /** `{index}` and `{count}` are replaced. */
    counterLabel?: string;
    /** `{index}` is replaced. */
    thumbnailLabel?: string;
    thumbnailsLabel?: string;
    emptyLabel?: string;
    onclose?: () => void;
    onOpenChange?: (open: boolean) => void;
    onindex?: (index: number) => void;
    actions?: Snippet<[{ image: BissLightboxImage | undefined; index: number }]>;
  }

  let {
    images,
    open = $bindable(false),
    index = $bindable(0),
    loop = true,
    thumbnails = true,
    portal = false,
    label = 'Image viewer',
    closeLabel = 'Close',
    previousLabel = 'Previous image',
    nextLabel = 'Next image',
    counterLabel = '{index} of {count}',
    thumbnailLabel = 'Show image {index}',
    thumbnailsLabel = 'Images',
    emptyLabel = 'No images to show.',
    onclose,
    onOpenChange,
    onindex,
    actions,
  }: Props = $props();

  const uid = $props.id();
  const count = $derived(images.length);
  const at = $derived(wrapIndex(index, count));
  const image = $derived(images[at]);
  const canPrevious = $derived(count > 1 && (loop || at > 0));
  const canNext = $derived(count > 1 && (loop || at < count - 1));
  const counter = $derived(fillLabel(counterLabel, { index: at + 1, count }));

  function go(next: number) {
    if (!count) return;
    index = loop ? wrapIndex(next, count) : Math.min(count - 1, Math.max(0, next));
    onindex?.(index);
  }
  function onKey(event: KeyboardEvent) {
    const moves: Record<string, () => void> = {
      ArrowLeft: () => canPrevious && go(at - 1),
      ArrowRight: () => canNext && go(at + 1),
      Home: () => go(0),
      End: () => go(count - 1),
    };
    const move = moves[event.key];
    if (!move || (event.target as HTMLElement).closest('input,textarea,select')) return;
    event.preventDefault();
    move();
  }
  // Swipe on touch screens.
  let startX: number | null = null;
  function onPointerDown(event: PointerEvent) {
    startX = event.pointerType === 'mouse' ? null : event.clientX;
  }
  function onPointerUp(event: PointerEvent) {
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0 && canNext) go(at + 1);
    if (delta > 0 && canPrevious) go(at - 1);
  }
  // Warm the neighbours so stepping feels instant.
  $effect(() => {
    if (!open || count < 2) return;
    for (const n of [at - 1, at + 1]) {
      const src = images[wrapIndex(n, count)]?.src;
      if (src) new Image().src = src;
    }
  });
  function focusViewer(event: Event) {
    event.preventDefault();
    document.querySelector<HTMLElement>(`[data-biss-lightbox="${uid}"]`)?.focus({ preventScroll: true });
  }
  function update(value: boolean) {
    open = value;
    onOpenChange?.(value);
    if (!value) onclose?.();
  }
</script>

<Dialog.Root {open} onOpenChange={update}
  ><Dialog.Portal disabled={!portal}
    ><Dialog.Overlay class="biss-lightbox-overlay" /><Dialog.Content
      class="biss-lightbox"
      tabindex={-1}
      data-biss-lightbox={uid}
      aria-describedby={uid + '-counter'}
      onOpenAutoFocus={focusViewer}
      onkeydown={onKey}
    >
      <header class="biss-lightbox-bar">
        <Dialog.Title class="biss-lightbox-title">{image?.alt || label}</Dialog.Title>
        {#if count > 1}<span id={uid + '-counter'} class="biss-lightbox-counter" aria-live="polite"
            >{counter}</span
          >{:else}<Dialog.Description id={uid + '-counter'} class="biss-visually-hidden"
            >{label}</Dialog.Description
          >{/if}
        {@render actions?.({ image, index: at })}
        <Dialog.Close
          id={uid + '-close'}
          class="biss-lightbox-button"
          aria-label={closeLabel}
          title={closeLabel}><BissIcon name="x" /></Dialog.Close
        >
      </header>
      <div
        class="biss-lightbox-stage"
        role="presentation"
        onpointerdown={onPointerDown}
        onpointerup={onPointerUp}
      >
        {#if count > 1}<button
            type="button"
            class="biss-lightbox-nav"
            data-side="previous"
            aria-label={previousLabel}
            title={previousLabel}
            disabled={!canPrevious}
            onclick={() => go(at - 1)}><BissIcon name="chevLeft" /></button
          >{/if}
        {#if image}
          <figure class="biss-lightbox-figure">
            {#key image.src}<img src={image.src} alt={image.alt} draggable="false" />{/key}
            {#if image.caption || image.credit}
              <figcaption>
                {#if image.caption}<span>{image.caption}</span>{/if}{#if image.credit}<small
                    >{image.credit}</small
                  >{/if}
              </figcaption>
            {/if}
          </figure>
        {:else}
          <p class="biss-lightbox-empty">{emptyLabel}</p>
        {/if}
        {#if count > 1}<button
            type="button"
            class="biss-lightbox-nav"
            data-side="next"
            aria-label={nextLabel}
            title={nextLabel}
            disabled={!canNext}
            onclick={() => go(at + 1)}><BissIcon name="chev" /></button
          >{/if}
      </div>
      {#if thumbnails && count > 1}
        <nav class="biss-lightbox-thumbs" aria-label={thumbnailsLabel}>
          {#each images as item, i (item.src + i)}
            <button
              type="button"
              aria-label={fillLabel(thumbnailLabel, { index: i + 1 })}
              aria-current={i === at || undefined}
              onclick={() => go(i)}><img src={item.thumbnail ?? item.src} alt="" loading="lazy" /></button
            >
          {/each}
        </nav>
      {/if}
    </Dialog.Content></Dialog.Portal
  ></Dialog.Root
>
