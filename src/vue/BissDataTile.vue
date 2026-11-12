<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  title,
  note = undefined,
  accent = 'var(--biss-primary)',
  source = undefined,
  sourceLabel = 'View records',
} = defineProps<{
  title: string;
  note?: string | undefined;
  accent?: string;
  source?: string | undefined;
  sourceLabel?: string;
}>();
</script>
<template>
  <section class="biss-data-tile">
    <header>
      <i class="biss-color-dot" :style="{ background: accent }" />
      <div class="biss-grow">
        <h3>{{ title }}</h3>
        <p v-if="note">{{ note }}</p>
      </div>
      <slot name="actions" />
    </header>
    <div class="biss-data-tile-body"><slot /></div>
    <footer v-if="source || $slots.footer">
      <slot name="footer" /><a v-if="source" :href="source"
        >{{ sourceLabel }}<BissIcon name="chev"
      /></a>
    </footer>
  </section>
</template>
