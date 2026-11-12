<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  title,
  note = undefined,
  icon = undefined,
  count = undefined,
  busy = false,
  flush = false,
} = defineProps<{
  title: string;
  note?: string | undefined;
  icon?: BissIconName | undefined;
  count?: number | undefined;
  busy?: boolean;
  flush?: boolean;
}>();
</script>
<template>
  <section class="biss-home-card" :aria-label="title" :aria-busy="busy">
    <header>
      <BissIcon v-if="icon" :name="icon" />
      <div class="biss-grow">
        <h2>{{ title }}</h2>
        <p v-if="note">{{ note }}</p>
      </div>
      <small v-if="count !== undefined">{{ count }}</small><slot name="actions" />
    </header>
    <div class="biss-home-body" :data-flush="flush"><slot /></div>
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>
