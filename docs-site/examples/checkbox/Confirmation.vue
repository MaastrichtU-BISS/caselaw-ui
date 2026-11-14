<script setup lang="ts">
import { ref } from 'vue';
import { BissButton, BissCheckbox } from 'biss-ui/vue';

const confirmed = ref(false);
</script>

<template>
  <form class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)" @submit.prevent>
    <BissCheckbox
      label="The data management plan is final"
      description="After submission the plan is locked and sent to the funder."
      :checked="confirmed"
      @change="confirmed = $event"
    />
    <div>
      <BissButton type="submit" :disabled="!confirmed">Submit plan</BissButton>
    </div>
  </form>
</template>
