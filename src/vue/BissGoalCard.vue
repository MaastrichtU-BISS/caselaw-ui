<script setup lang="ts">
import BissGoalBar from './BissGoalBar.vue';
const {
  title,
  progress,
  label,
  expected = undefined,
  status = undefined,
  tone = 'primary',
  href = undefined,
} = defineProps<{
  title: string;
  progress: number | null;
  label: string;
  expected?: number | undefined;
  status?: string | undefined;
  tone?: 'primary' | 'success' | 'danger' | 'warning';
  href?: string | undefined;
}>();
</script>
<template>
  <article class="biss-goal-card">
    <header>
      <a v-if="href" :href="href">{{ title }}</a>
      <h3 v-else>{{ title }}</h3>
      <slot name="actions" />
    </header>
    <p v-if="status">{{ status }}</p>
    <BissGoalBar :value="progress" :expected="expected" :label="label" :tone="tone" />
    <footer>
      <span>{{ progress === null ? '—' : Math.round(progress * 100) + '%' }}</span><slot />
    </footer>
  </article>
</template>
