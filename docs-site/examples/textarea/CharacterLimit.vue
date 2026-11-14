<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissField, BissTextarea } from 'biss-ui/vue';

const limit = 280;
const abstract = ref(
  'We trace how the Court of Justice cites its own judgments, using network analysis over 40 years of case law.',
);
const left = computed(() => limit - abstract.value.length);
</script>

<template>
  <div style="width: min(100%, 28rem)">
    <BissField
      label="Public abstract"
      :hint="`${left} characters left`"
      :error="left < 0 ? `${-left} characters over the limit` : undefined"
    >
      <BissTextarea v-model="abstract" :rows="4" />
    </BissField>
  </div>
</template>
