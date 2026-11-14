<script setup lang="ts">
import { reactive } from 'vue';
import { BissCheckbox } from 'biss-ui/vue';

const notify = reactive({ deadlines: true, comments: true, digest: false });
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)">
    <BissCheckbox
      label="Upcoming deadlines"
      description="Seven days and one day before a deliverable is due."
      :checked="notify.deadlines"
      @change="notify.deadlines = $event"
    />
    <BissCheckbox
      label="Comments and mentions"
      description="When someone replies to you or mentions you."
      :checked="notify.comments"
      @change="notify.comments = $event"
    />
    <BissCheckbox
      label="Weekly digest"
      description="A Monday summary of activity across your projects."
      :checked="notify.digest"
      @change="notify.digest = $event"
    />
  </div>
</template>
