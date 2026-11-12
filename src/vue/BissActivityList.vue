<script setup lang="ts">
import BissAvatar from './BissAvatar.vue';
const { items, label } = defineProps<{
  items: { key: string; actor: string; action: string; time: string; detail?: string }[];
  label: string;
}>();
</script>
<template>
  <ol class="biss-activity-list" :aria-label="label">
    <li v-for="item in items" :key="item.key">
      <BissAvatar :name="item.actor" :size="24" />
      <div>
        <b>{{ item.actor }}</b> {{ item.action }}
        <p v-if="item.detail">{{ item.detail }}</p>
        <small>{{ item.time }}</small>
      </div>
    </li>
  </ol>
</template>
