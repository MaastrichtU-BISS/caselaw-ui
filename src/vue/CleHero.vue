<script setup lang="ts">
/**
 * The centred hero every Case Law Explorer entry page opens with.
 *
 * Each product had drawn its own — same intent, slightly different type scale
 * every time — so arriving from one to another felt like leaving the product.
 * The sizes come from the shared `--cle-text-h1` and `--cle-text-lead` tokens,
 * which is what makes them agree.
 *
 * `align="start"` exists for pages that sit inside a console shell, where a
 * centred title would fight the left-aligned content under it.
 */
import CleHeroPill from "./CleHeroPill.vue";

withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    subtitle?: string;
    /** Short labels above the title — what this product covers, at a glance. */
    pills?: string[];
    align?: "center" | "start";
  }>(),
  { align: "center" },
);
</script>

<template>
  <header class="cle-hero" :class="`cle-hero-${align}`">
    <div v-if="pills?.length || $slots.pills" class="cle-hero-pills">
      <CleHeroPill v-for="pill in pills" :key="pill">{{ pill }}</CleHeroPill>
      <slot name="pills" />
    </div>

    <p v-if="eyebrow" class="cle-eyebrow">{{ eyebrow }}</p>
    <h1 class="cle-hero-title">{{ title }}</h1>
    <p v-if="subtitle" class="cle-hero-subtitle">{{ subtitle }}</p>

    <div v-if="$slots.actions" class="cle-hero-actions">
      <slot name="actions" />
    </div>

    <slot />
  </header>
</template>
