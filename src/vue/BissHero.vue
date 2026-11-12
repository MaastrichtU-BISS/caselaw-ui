<script setup lang="ts">
/**
 * The centred hero every Case Law Explorer entry page opens with.
 *
 * Each product had drawn its own — same intent, slightly different type scale
 * every time — so arriving from one to another felt like leaving the product.
 * The sizes come from the shared `--biss-text-h1` and `--biss-text-lead` tokens,
 * which is what makes them agree.
 *
 * `align="start"` exists for pages that sit inside a console shell, where a
 * centred title would fight the left-aligned content under it.
 */
import BissHeroPill from './BissHeroPill.vue';

withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    subtitle?: string;
    /** Short labels above the title — what this product covers, at a glance. */
    pills?: string[];
    align?: 'center' | 'start';
  }>(),
  { align: 'center' },
);
</script>

<template>
  <header class="biss-hero" :class="`biss-hero-${align}`">
    <div v-if="pills?.length || $slots.pills" class="biss-hero-pills">
      <BissHeroPill v-for="pill in pills" :key="pill">{{ pill }}</BissHeroPill>
      <slot name="pills" />
    </div>

    <p v-if="eyebrow" class="biss-eyebrow">{{ eyebrow }}</p>
    <h1 class="biss-hero-title">{{ title }}</h1>
    <p v-if="subtitle" class="biss-hero-subtitle">{{ subtitle }}</p>

    <div v-if="$slots.actions" class="biss-hero-actions">
      <slot name="actions" />
    </div>

    <slot />
  </header>
</template>
