<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissInput } from 'biss-ui/vue';

const orcid = ref('');
const institution = ref('Maastricht University');
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)">
    <BissField label="ORCID iD" hint="Links your publications to this project." optional>
      <BissInput v-model="orcid" placeholder="0000-0002-1825-0097" mono />
    </BissField>
    <BissField label="Institution" hint="Managed by your workspace administrator." disabled>
      <BissInput v-model="institution" />
    </BissField>
  </div>
</template>
