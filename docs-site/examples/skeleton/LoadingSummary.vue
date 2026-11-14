<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BissButton, BissSkeleton } from 'biss-ui/vue';

const loading = ref(true);

async function load() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Your request goes here.
  loading.value = false;
}

onMounted(load);
</script>

<template>
  <section class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)" :aria-busy="loading">
    <template v-if="loading">
      <span class="biss-visually-hidden" role="status">Loading project summary</span>
      <BissSkeleton height="20px" width="55%" />
      <BissSkeleton :lines="3" />
    </template>
    <template v-else>
      <h3 style="margin: 0">Digital Legal Studies</h3>
      <p style="margin: 0">
        Four-year NWO project mapping how Dutch courts cite European case law. Two PhD
        positions, one postdoc, and a public dataset due in June 2027.
      </p>
    </template>
    <div><BissButton variant="secondary" size="sm" :loading="loading" @click="load">Reload</BissButton></div>
  </section>
</template>
