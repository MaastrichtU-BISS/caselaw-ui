<script setup lang="ts">
import {ref} from 'vue';
import {BissField,BissInput,BissButton} from '../../src/vue';
const nativeValue=ref('Research'),activations=ref(0);
import ComponentPreview from '../../docs-site/ComponentPreview.vue';
import { newFixtures } from '../../docs-site/new-fixtures';
</script>
<template>
  <div class="library-examples"><article data-library="Foundation"><h2>Field and action contracts</h2><BissField label="Native project name" hint="Use a recognizable name."><BissInput v-model="nativeValue"/></BissField><output data-native-value>{{nativeValue}}</output><BissButton href="#" disabled @click="activations++">Disabled destination</BissButton><output data-activations>{{activations}}</output><BissButton data-idle>Save item</BissButton><BissButton loading>Save item</BissButton></article>
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
