<script setup lang="ts">
/**
 * One step of a setup sequence.
 *
 * `done` marks it satisfied; `current` marks the one to do next. Both are the
 * caller's judgement rather than something derived from position, because
 * "what is still missing" is usually read from live state — a secret that
 * exists, a manifest that has arrived — not from how far a wizard has walked.
 */
withDefaults(defineProps<{
  index: number | string;
  title: string;
  copy?: string;
  done?: boolean;
  current?: boolean;
}>(), {
  done: false,
  current: false,
});
</script>

<template>
  <li class="cle-step" :class="{ 'is-done': done, 'is-current': current && !done }">
    <div class="cle-step-rail" aria-hidden="true">
      <span class="cle-step-marker">
        <slot name="marker">{{ done ? "✓" : index }}</slot>
      </span>
      <span class="cle-step-line" />
    </div>
    <div class="cle-step-body">
      <p class="cle-step-title">{{ title }}</p>
      <p v-if="copy" class="cle-step-copy">{{ copy }}</p>
      <div v-if="$slots.default" class="cle-step-content">
        <slot />
      </div>
    </div>
  </li>
</template>
