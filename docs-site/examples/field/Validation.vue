<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissField, BissInput } from 'biss-ui/vue';

const grantNumber = ref('');
const error = ref('');

function submit() {
  error.value = /^\d{9}$/.test(grantNumber.value)
    ? ''
    : 'Enter the 9-digit grant agreement number, for example 101094521.';
}
</script>

<template>
  <form
    novalidate
    class="biss-stack biss-stack-sm"
    style="width: min(100%, 24rem)"
    @submit.prevent="submit"
  >
    <BissField
      label="Grant agreement number"
      hint="You can find it on the first page of the agreement."
      :error="error"
      required
    >
      <BissInput v-model="grantNumber" inputmode="numeric" mono />
    </BissField>
    <div>
      <BissButton type="submit">Link grant</BissButton>
    </div>
  </form>
</template>
