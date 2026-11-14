<script setup lang="ts">
import { ref, watch } from 'vue';
import { BissPagination } from 'biss-ui/vue';

const page = ref(3);
const pageSize = ref(25);
watch(pageSize, () => (page.value = 1));
</script>

<template>
  <BissPagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :total="482"
    :page-sizes="[25, 50, 100]"
  />
</template>
