<script setup lang="ts">
import { ref } from 'vue';
import { BissPagination } from 'biss-ui/vue';

const page = ref(8);
</script>

<template>
  <BissPagination v-model:page="page" :pages="20" :siblings="2" label="Search results" />
</template>
