<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissField, BissInput, BissPopover } from 'biss-ui/vue';

const reviewers = ref(['Dr. Sanne de Vries']);
const email = ref('');

function add() {
  if (!email.value.trim()) return;
  reviewers.value = [...reviewers.value, email.value.trim()];
  email.value = '';
}
</script>

<template>
  <BissPopover label="Add reviewer">
    <form class="biss-stack biss-stack-sm" @submit.prevent="add">
      <BissField label="Email address">
        <BissInput v-model="email" type="email" placeholder="name@maastrichtuniversity.nl" />
      </BissField>
      <BissButton type="submit" size="sm">Add reviewer</BissButton>
    </form>
  </BissPopover>
  <p role="status">Reviewers: {{ reviewers.join(', ') }}</p>
</template>
