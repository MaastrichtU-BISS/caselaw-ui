<script setup lang="ts">
/**
 * View images large, over the page. ←/→ step through them, Home/End jump to the
 * first and last, Escape or the close button closes and focus returns to what
 * opened it. The host opens it and may bind the current index.
 */
import { computed, useId, watch } from 'vue';
import * as Dialog from './dialog';
import BissIcon from './BissIcon.vue';
import { wrapIndex, type BissLightboxImage } from '../core/templates';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    images: BissLightboxImage[];
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
  }>(),
  {
    loop: true,
    thumbnails: true,
    portal: false,
    label: 'Image viewer',
    closeLabel: 'Close',
    previousLabel: 'Previous image',
    nextLabel: 'Next image',
    counterLabel: '{index} of {count}',
    thumbnailLabel: 'Show image {index}',
    thumbnailsLabel: 'Images',
    emptyLabel: 'No images to show.',
  },
);
const open = defineModel<boolean>('open', { default: false });
const index = defineModel<number>('index', { default: 0 });
const emit = defineEmits<{ close: [] }>();

const uid = useId();
const count = computed(() => props.images.length);
const at = computed(() => wrapIndex(index.value, count.value));
const image = computed(() => props.images[at.value]);
const canPrevious = computed(() => count.value > 1 && (props.loop || at.value > 0));
const canNext = computed(() => count.value > 1 && (props.loop || at.value < count.value - 1));
const counter = computed(() =>
  fillLabel(props.counterLabel, { index: at.value + 1, count: count.value }),
);

function go(next: number) {
  if (!count.value) return;
  index.value = props.loop
    ? wrapIndex(next, count.value)
    : Math.min(count.value - 1, Math.max(0, next));
}
function onKey(event: KeyboardEvent) {
  const moves: Record<string, () => void> = {
    ArrowLeft: () => canPrevious.value && go(at.value - 1),
    ArrowRight: () => canNext.value && go(at.value + 1),
    Home: () => go(0),
    End: () => go(count.value - 1),
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
  if (delta < 0 && canNext.value) go(at.value + 1);
  if (delta > 0 && canPrevious.value) go(at.value - 1);
}
// Warm the neighbours so stepping feels instant.
watch(
  [at, open],
  () => {
    if (!open.value || typeof window === 'undefined' || count.value < 2) return;
    for (const n of [at.value - 1, at.value + 1]) {
      const src = props.images[wrapIndex(n, count.value)]?.src;
      if (src) new Image().src = src;
    }
  },
  { immediate: true },
);
function focusViewer(event: Event) {
  event.preventDefault();
  document.querySelector<HTMLElement>(`[data-biss-lightbox="${uid}"]`)?.focus({ preventScroll: true });
}
function update(value: boolean) {
  open.value = value;
  if (!value) emit('close');
}
</script>

<template>
  <Dialog.Root :open="open" @update:open="update"
    ><Dialog.Portal :disabled="!portal"
      ><Dialog.Overlay class="biss-lightbox-overlay" /><Dialog.Content
        class="biss-lightbox"
        tabindex="-1"
        :data-biss-lightbox="uid"
        :aria-describedby="uid + '-counter'"
        @open-auto-focus="focusViewer"
        @keydown="onKey"
      >
        <header class="biss-lightbox-bar">
          <Dialog.Title class="biss-lightbox-title">{{ image?.alt || label }}</Dialog.Title>
          <span v-if="count > 1" :id="uid + '-counter'" class="biss-lightbox-counter" aria-live="polite">{{
            counter
          }}</span>
          <Dialog.Description v-else :id="uid + '-counter'" class="biss-visually-hidden">{{
            label
          }}</Dialog.Description>
          <slot name="actions" :image="image" :index="at" />
          <Dialog.Close :id="uid + '-close'" class="biss-lightbox-button" :aria-label="closeLabel" :title="closeLabel"
            ><BissIcon name="x"
          /></Dialog.Close>
        </header>
        <div class="biss-lightbox-stage" @pointerdown="onPointerDown" @pointerup="onPointerUp">
          <button
            v-if="count > 1"
            type="button"
            class="biss-lightbox-nav"
            data-side="previous"
            :aria-label="previousLabel"
            :title="previousLabel"
            :disabled="!canPrevious"
            @click="go(at - 1)"
          >
            <BissIcon name="chevLeft" />
          </button>
          <figure v-if="image" class="biss-lightbox-figure">
            <img :key="image.src" :src="image.src" :alt="image.alt" draggable="false" />
            <figcaption v-if="image.caption || image.credit">
              <span v-if="image.caption">{{ image.caption }}</span
              ><small v-if="image.credit">{{ image.credit }}</small>
            </figcaption>
          </figure>
          <p v-else class="biss-lightbox-empty">{{ emptyLabel }}</p>
          <button
            v-if="count > 1"
            type="button"
            class="biss-lightbox-nav"
            data-side="next"
            :aria-label="nextLabel"
            :title="nextLabel"
            :disabled="!canNext"
            @click="go(at + 1)"
          >
            <BissIcon name="chev" />
          </button>
        </div>
        <nav v-if="thumbnails && count > 1" class="biss-lightbox-thumbs" :aria-label="thumbnailsLabel">
          <button
            v-for="(item, i) in images"
            :key="item.src + i"
            type="button"
            :aria-label="fillLabel(thumbnailLabel, { index: i + 1 })"
            :aria-current="i === at || undefined"
            @click="go(i)"
          >
            <img :src="item.thumbnail ?? item.src" alt="" loading="lazy" />
          </button>
        </nav>
      </Dialog.Content></Dialog.Portal
  ></Dialog.Root>
</template>
