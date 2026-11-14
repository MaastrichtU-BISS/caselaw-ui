<script setup lang="ts">
import { ref } from 'vue';
import { BissSwitch } from 'biss-ui/vue';

const publicPage = ref(true);
const guestComments = ref(false);
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
    <BissSwitch
      v-model="publicPage"
      label="Public project page"
      :hint="publicPage ? 'Visible at biss.example/p/citation-networks' : 'Only members can see the project.'"
    />
    <BissSwitch
      v-model="guestComments"
      label="Comments from guest reviewers"
      hint="Guests can comment on shared drafts."
    />
  </div>
</template>
