<script setup lang="ts">
import ComponentPreview from '../../docs-site/ComponentPreview.vue';
import { newFixtures } from '../../docs-site/new-fixtures';
</script>
<template>
  <div class="library-examples">
    <article v-for="(_, name) in newFixtures" :key="name" :data-library="name">
      <h2>{{ name }}</h2>
      <ComponentPreview :name="'Biss' + name" />
    </article>
  </div>
</template>
<style>
.library-examples {
  display: grid;
  gap: 24px;
}
.library-examples article {
  min-width: 0;
  border-top: 1px solid var(--biss-border);
  padding-top: 20px;
}
.library-examples h2 {
  font-size: 15px;
  font-weight: 600;
}
.library-examples .preview-frame {
  align-items: stretch;
}
.library-examples .preview-frame > * {
  width: 100%;
}
</style>
