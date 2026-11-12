<script setup lang="ts">
/**
 * One step of a setup sequence.
 *
 * `done` marks it satisfied; `current` marks the one to do next. Both are the
 * caller's judgement rather than something derived from position, because
 * "what is still missing" is usually read from live state — a secret that
 * exists, a manifest that has arrived — not from how far a wizard has walked.
 */
withDefaults(
  defineProps<{
    index: number | string;
    title: string;
    copy?: string;
    done?: boolean;
    current?: boolean;
  }>(),
  {
    done: false,
    current: false,
  },
);
</script>

<template>
  <li class="biss-step" :class="{ 'is-done': done, 'is-current': current && !done }">
    <div class="biss-step-rail" aria-hidden="true">
      <span class="biss-step-marker">
        <slot name="marker">{{ done ? '✓' : index }}</slot>
      </span>
      <span class="biss-step-line" />
    </div>
    <div class="biss-step-body">
      <p class="biss-step-title">{{ title }}</p>
      <p v-if="copy" class="biss-step-copy">{{ copy }}</p>
      <div v-if="$slots.default" class="biss-step-content">
        <slot />
      </div>
    </div>
  </li>
</template>
