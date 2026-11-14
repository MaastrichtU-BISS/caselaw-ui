<script setup lang="ts">
import { ref } from 'vue';
import { BissTagInput } from 'biss-ui/vue';

const keywords = ref(['case-law', 'GDPR']);
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
    <BissTagInput
      v-model="keywords"
      placeholder="Add keyword"
      :suggestions="['competition', 'human-rights', 'migration']"
    />
    <p style="color: var(--biss-muted)">{{ keywords.length }} keywords on this project</p>
  </div>
</template>
