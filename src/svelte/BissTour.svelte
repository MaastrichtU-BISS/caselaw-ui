<script lang="ts">
  /**
   * A step-by-step tour: the current step's target is spotlit and a small card
   * beside it explains what it is. Back, Next and Skip work from the keyboard
   * (←/→ in the card, Escape skips). When a target is missing the card is
   * centered and the page dimmed. The page stays usable; the tour changes no data.
   * Positioning, dismissal and focus come from Bits UI's Popover.
   */
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import { Popover, Portal } from 'bits-ui';
  import BissIcon from './BissIcon.svelte';
  import BissButton from './BissButton.svelte';
  import { fillLabel } from '../core/blocks';
  import {
    centerAnchor,
    clampStep,
    findTarget,
    needsScroll,
    spotlightRect,
    type BissRect,
    type BissTourStep,
  } from '../core/tour';

  interface Props {
    steps: BissTourStep[];
    open?: boolean;
    /** The current step's index. */
    step?: number;
    /** The tour's name, read before the progress. */
    label?: string;
    /** `{current}` and `{total}` are replaced. */
    progressLabel?: string;
    backLabel?: string;
    nextLabel?: string;
    doneLabel?: string;
    skipLabel?: string;
    /** Space between the target and the spotlight edge, in pixels. */
    padding?: number;
    /** Card width in pixels; narrower on small screens. */
    width?: number;
    /** Dim the page around the spotlight. */
    dim?: boolean;
    /** Render the spotlight and card in `<body>`. */
    portal?: boolean;
    /** The step changed through Back or Next. */
    onchange?: (index: number) => void;
    /** Done on the last step. */
    onfinish?: () => void;
    /** Skip, the close button or Escape, with the step the tour was on. */
    onskip?: (index: number) => void;
    onOpenChange?: (open: boolean) => void;
    /** Extra content under the step's text. */
    children?: Snippet<[{ step: BissTourStep; index: number }]>;
  }

  let {
    steps,
    open = $bindable(false),
    step = $bindable(0),
    label = 'Product tour',
    progressLabel = 'Step {current} of {total}',
    backLabel = 'Back',
    nextLabel = 'Next',
    doneLabel = 'Done',
    skipLabel = 'Skip tour',
    padding = 6,
    width = 320,
    dim = true,
    portal = true,
    onchange,
    onfinish,
    onskip,
    onOpenChange,
    children,
  }: Props = $props();

  const uid = $props.id();
  const index = $derived(clampStep(step, steps.length));
  const current = $derived(steps[index]);
  const last = $derived(index === steps.length - 1);
  const progress = $derived(fillLabel(progressLabel, { current: index + 1, total: steps.length }));

  let target = $state.raw<HTMLElement | null>(null);
  let rect = $state<BissRect | null>(null);
  let viewport = $state({ width: 0, height: 0 });
  let card = $state<HTMLElement | null>(null);
  const nextButton = () => card?.querySelector<HTMLElement>('[data-biss-tour-next]') ?? null;
  let previous: HTMLElement | null = null;

  const hole = $derived(rect ? spotlightRect(rect, padding, viewport) : null);
  const anchor = $derived.by(() => {
    const el = target;
    if (el) return el;
    return {
      getBoundingClientRect: () => {
        const c = centerAnchor({ width: innerWidth, height: innerHeight });
        return new DOMRect(c.left, c.top, 0, 0);
      },
    };
  });

  let frame = 0;
  function measure() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      viewport = { width: innerWidth, height: innerHeight };
      if (target && !target.isConnected) target = findTarget(current?.target);
      const r = target?.getBoundingClientRect();
      rect = r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null;
    });
  }
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Listen while open: the spotlight follows scrolling, resizing and the target's own size.
  $effect(() => {
    if (!open) return;
    previous = document.activeElement as HTMLElement | null;
    addEventListener('resize', measure);
    addEventListener('scroll', measure, true);
    return () => {
      removeEventListener('resize', measure);
      removeEventListener('scroll', measure, true);
      cancelAnimationFrame(frame);
      target = null;
      rect = null;
    };
  });
  // Find, scroll to and observe each step's target.
  $effect(() => {
    if (!open || !current) return;
    const wanted = current.target;
    let observer: ResizeObserver | undefined;
    tick().then(() => {
      const el = findTarget(wanted);
      target = el;
      if (el) {
        const r = el.getBoundingClientRect();
        if (needsScroll(r, { width: innerWidth, height: innerHeight }))
          el.scrollIntoView({
            block: 'center',
            inline: 'nearest',
            behavior: reduced() ? 'auto' : 'smooth',
          });
        observer = new ResizeObserver(measure);
        observer.observe(el);
      }
      measure();
      // Keep focus in the card from step to step (Back disappears on the first step).
      if (card && !card.contains(document.activeElement)) nextButton()?.focus();
    });
    return () => observer?.disconnect();
  });

  function setOpen(value: boolean) {
    open = value;
    onOpenChange?.(value);
  }
  function go(to: number) {
    const next = clampStep(to, steps.length);
    if (next === index) return;
    step = next;
    onchange?.(next);
  }
  function next() {
    if (last) {
      onfinish?.();
      setOpen(false);
    } else go(index + 1);
  }
  function skip() {
    onskip?.(index);
    setOpen(false);
  }
  function onKey(event: KeyboardEvent) {
    if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  }
  function focusNext(event: Event) {
    event.preventDefault();
    nextButton()?.focus({ preventScroll: true });
  }
  function restore(event: Event) {
    if (previous?.isConnected) {
      event.preventDefault();
      previous.focus({ preventScroll: true });
    }
  }
</script>

{#if open && current}
  <Portal disabled={!portal}>
    <div class="biss-tour-layer" data-dim={dim || undefined} aria-hidden="true">
      {#if hole}<div
          class="biss-tour-spotlight"
          style:top="{hole.top}px"
          style:left="{hole.left}px"
          style:width="{hole.width}px"
          style:height="{hole.height}px"
        ></div>{:else if dim}<div class="biss-tour-backdrop"></div>{/if}
    </div>
  </Portal>
{/if}
<Popover.Root
  open={open && !!current}
  onOpenChange={(value) => {
    if (!value && open) skip();
  }}
>
  <Popover.Portal disabled={!portal}>
    {#if current}
      <Popover.Content
        bind:ref={card}
        class="biss-block-popover biss-tour-card"
        customAnchor={anchor}
        side={current.placement ?? 'bottom'}
        align="center"
        sideOffset={hole ? 12 : 0}
        collisionPadding={12}
        updatePositionStrategy={target ? 'optimized' : 'always'}
        trapFocus={false}
        aria-labelledby={uid + '-title'}
        aria-describedby={current.body ? uid + '-body' : undefined}
        style={`width:min(${width}px, calc(100vw - 24px))`}
        onInteractOutside={(event) => event.preventDefault()}
        onOpenAutoFocus={focusNext}
        onCloseAutoFocus={restore}
        onkeydown={onKey}
      >
        <header class="biss-tour-head">
          <span class="biss-tour-progress"
            ><span class="biss-visually-hidden">{label}: </span>{progress}</span
          >
          <button
            type="button"
            class="biss-header-action biss-tour-close"
            aria-label={skipLabel}
            title={skipLabel}
            onclick={skip}><BissIcon name="x" /></button
          >
        </header>
        <h2 id={uid + '-title'} class="biss-tour-title">{current.title}</h2>
        {#if current.body}<p id={uid + '-body'} class="biss-tour-body" aria-live="polite">
            {current.body}
          </p>{/if}
        {@render children?.({ step: current, index })}
        <div class="biss-tour-dots" aria-hidden="true">
          {#each steps as s, i (s.id)}<i
              data-active={i === index || undefined}
              data-done={i < index || undefined}
            ></i>{/each}
        </div>
        <footer class="biss-tour-foot">
          <BissButton variant="ghost" size="sm" onclick={skip}>{skipLabel}</BissButton>
          <span class="biss-grow"></span>
          {#if index > 0}<BissButton variant="secondary" size="sm" onclick={() => go(index - 1)}
              >{backLabel}</BissButton
            >{/if}
          <BissButton size="sm" data-biss-tour-next="" onclick={next}
            >{last ? doneLabel : nextLabel}</BissButton
          >
        </footer>
      </Popover.Content>
    {/if}
  </Popover.Portal>
</Popover.Root>
