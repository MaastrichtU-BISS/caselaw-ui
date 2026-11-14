<script setup lang="ts">
import { ref } from 'vue';
import { BissSwitch } from 'biss-ui/vue';

const sync = ref(false);
const autoArchive = ref(false);
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
    <BissSwitch v-model="sync" label="Sync with Pure" hint="Import publications every night." />
    <BissSwitch
      v-model="autoArchive"
      label="Archive superseded versions"
      :hint="sync ? 'Keeps only the newest record per DOI.' : 'Turn on Pure sync first.'"
      :disabled="!sync"
    />
  </div>
</template>
