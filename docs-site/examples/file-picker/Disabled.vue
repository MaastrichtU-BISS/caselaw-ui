<script setup lang="ts">
import { BissFilePicker } from 'biss-ui/vue';
</script>

<template>
  <div style="width: min(100%, 22rem)">
    <BissFilePicker
      label="Add final report"
      hint="Submissions closed on 1 November."
      disabled
    />
  </div>
</template>
