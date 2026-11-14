<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissTextarea } from 'biss-ui/vue';

const citation = ref(`@article{vandenberg2026citations,
  title   = {Citation Networks of the CJEU},
  author  = {van den Berg, Anouk and Rossi, Marco},
  journal = {Maastricht Journal},
  year    = {2026}
}`);
</script>

<template>
  <div style="width: min(100%, 32rem)">
    <BissField label="BibTeX entry" hint="Paste the entry exported from your reference manager.">
      <BissTextarea v-model="citation" :rows="6" mono spellcheck="false" />
    </BissField>
  </div>
</template>
