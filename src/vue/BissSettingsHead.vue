<script setup lang="ts">
defineProps<{ title: string; help?: string; more?: string }>();
</script>
<template>
  <div class="biss-settings-head">
    <div>
      <h2>
        {{ title }}
        <button type="button" class="biss-help" v-if="more" :title="more" :aria-label="more">
          ?
        </button>
      </h2>
      <p v-if="help">{{ help }}</p>
    </div>
    <slot />
  </div>
</template>
