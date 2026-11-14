<script setup lang="ts">
/**
 * A step-by-step tour: the current step's target is spotlit and a small card
 * beside it explains what it is. Back, Next and Skip work from the keyboard
 * (←/→ in the card, Escape skips). When a target is missing the card is
 * centered and the page dimmed. The page stays usable; the tour changes no data.
 * Positioning, dismissal and focus come from Reka UI's Popover.
 */
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, useId, watch } from 'vue';
import { PopoverContent, PopoverPortal, PopoverRoot, type ReferenceElement } from 'reka-ui';
import BissIcon from './BissIcon.vue';
import BissButton from './BissButton.vue';
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

const props = withDefaults(
  defineProps<{
    steps: BissTourStep[];
    /** The tour's name, used as the card's accessible description of progress. */
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
  }>(),
  {
    label: 'Product tour',
    progressLabel: 'Step {current} of {total}',
    backLabel: 'Back',
    nextLabel: 'Next',
    doneLabel: 'Done',
    skipLabel: 'Skip tour',
    padding: 6,
    width: 320,
    dim: true,
    portal: true,
  },
);
const open = defineModel<boolean>('open', { default: false });
const step = defineModel<number>('step', { default: 0 });
const emit = defineEmits<{
  /** The step changed through Back or Next. */
  change: [index: number];
  /** Done on the last step. */
  finish: [];
  /** Skip, the close button or Escape, with the step the tour was on. */
  skip: [index: number];
}>();

const uid = useId();
const index = computed(() => clampStep(step.value, props.steps.length));
const current = computed(() => props.steps[index.value]);
const last = computed(() => index.value === props.steps.length - 1);
const progress = computed(() =>
  fillLabel(props.progressLabel, { current: index.value + 1, total: props.steps.length }),
);

const target = shallowRef<HTMLElement | null>(null);
const rect = ref<BissRect | null>(null);
const viewport = ref({ width: 0, height: 0 });
const nextButton = ref<{ $el: HTMLElement } | null>(null);
let previous: HTMLElement | null = null;

const hole = computed(() =>
  rect.value ? spotlightRect(rect.value, props.padding, viewport.value) : null,
);
const reference = computed<ReferenceElement>(() => {
  const el = target.value;
  return {
    getBoundingClientRect: () => {
      if (el?.isConnected) return el.getBoundingClientRect();
      const c = centerAnchor({ width: innerWidth, height: innerHeight });
      return new DOMRect(c.left, c.top, 0, 0);
    },
    ...(el ? { contextElement: el } : {}),
  };
});

let frame = 0;
function measure() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    viewport.value = { width: innerWidth, height: innerHeight };
    const el = target.value;
    if (el && !el.isConnected) target.value = findTarget(current.value?.target);
    const r = target.value?.getBoundingClientRect();
    rect.value = r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null;
  });
}
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let observer: ResizeObserver | undefined;
function locate() {
  const el = findTarget(current.value?.target);
  target.value = el;
  observer?.disconnect();
  if (el) {
    const r = el.getBoundingClientRect();
    if (needsScroll(r, { width: innerWidth, height: innerHeight }))
      el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
    observer = new ResizeObserver(measure);
    observer.observe(el);
  }
  measure();
}
function listen(on: boolean) {
  const method = on ? addEventListener : removeEventListener;
  method('resize', measure);
  method('scroll', measure, true);
  if (!on) {
    observer?.disconnect();
    cancelAnimationFrame(frame);
  }
}
watch(
  () => [open.value, index.value, current.value?.target] as const,
  async ([isOpen], before) => {
    if (typeof window === 'undefined') return;
    if (!isOpen) {
      if (before?.[0]) listen(false);
      target.value = null;
      rect.value = null;
      return;
    }
    if (!before?.[0]) {
      previous = document.activeElement as HTMLElement | null;
      listen(true);
    }
    await nextTick();
    locate();
    // Keep focus in the card from step to step (Back disappears on the first step).
    const card = document.getElementById(uid + '-card');
    if (card && !card.contains(document.activeElement)) nextButton.value?.$el.focus();
  },
  { immediate: true },
);
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') listen(false);
});

function go(to: number) {
  const next = clampStep(to, props.steps.length);
  if (next === index.value) return;
  step.value = next;
  emit('change', next);
}
function next() {
  if (last.value) {
    emit('finish');
    open.value = false;
  } else go(index.value + 1);
}
function skip() {
  emit('skip', index.value);
  open.value = false;
}
function onOpenChange(value: boolean) {
  if (!value && open.value) skip();
}
function onKey(event: KeyboardEvent) {
  if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    go(index.value - 1);
  }
}
function focusNext(event: Event) {
  event.preventDefault();
  nextButton.value?.$el.focus({ preventScroll: true });
}
function restore(event: Event) {
  if (previous?.isConnected) {
    event.preventDefault();
    previous.focus({ preventScroll: true });
  }
}
</script>

<template>
  <PopoverRoot :open="open && !!current" @update:open="onOpenChange">
    <Teleport to="body" :disabled="!portal">
      <div
        v-if="open && current"
        class="biss-tour-layer"
        :data-dim="dim || undefined"
        aria-hidden="true"
      >
        <div
          v-if="hole"
          class="biss-tour-spotlight"
          :style="{
            top: hole.top + 'px',
            left: hole.left + 'px',
            width: hole.width + 'px',
            height: hole.height + 'px',
          }"
        />
        <div v-else-if="dim" class="biss-tour-backdrop" />
      </div>
    </Teleport>
    <PopoverPortal :disabled="!portal">
      <PopoverContent
        v-if="current"
        :id="uid + '-card'"
        class="biss-block-popover biss-tour-card"
        :reference="reference"
        :side="current.placement ?? 'bottom'"
        align="center"
        :side-offset="hole ? 12 : 0"
        :collision-padding="12"
        :update-position-strategy="target ? 'optimized' : 'always'"
        :aria-labelledby="uid + '-title'"
        :aria-describedby="current.body ? uid + '-body' : undefined"
        :style="{ width: `min(${width}px, calc(100vw - 24px))` }"
        @interact-outside="$event.preventDefault()"
        @open-auto-focus="focusNext"
        @close-auto-focus="restore"
        @keydown="onKey"
      >
        <header class="biss-tour-head">
          <span class="biss-tour-progress"
            ><span class="biss-visually-hidden">{{ label }}: </span>{{ progress }}</span
          >
          <button
            type="button"
            class="biss-header-action biss-tour-close"
            :aria-label="skipLabel"
            :title="skipLabel"
            @click="skip"
          >
            <BissIcon name="x" />
          </button>
        </header>
        <h2 :id="uid + '-title'" class="biss-tour-title">{{ current.title }}</h2>
        <p v-if="current.body" :id="uid + '-body'" class="biss-tour-body" aria-live="polite">
          {{ current.body }}
        </p>
        <slot name="step" :step="current" :index="index" />
        <div class="biss-tour-dots" aria-hidden="true">
          <i v-for="(s, i) in steps" :key="s.id" :data-active="i === index || undefined" :data-done="i < index || undefined" />
        </div>
        <footer class="biss-tour-foot">
          <BissButton variant="ghost" size="sm" @click="skip">{{ skipLabel }}</BissButton>
          <span class="biss-grow" />
          <BissButton v-if="index > 0" variant="secondary" size="sm" @click="go(index - 1)">{{
            backLabel
          }}</BissButton>
          <BissButton ref="nextButton" size="sm" @click="next">{{
            last ? doneLabel : nextLabel
          }}</BissButton>
        </footer>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
