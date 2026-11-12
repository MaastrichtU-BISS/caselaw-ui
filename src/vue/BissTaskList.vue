<script setup lang="ts">
import BissAvatar from './BissAvatar.vue';
const {
  items,
  label = 'Tasks',
  completeLabel = 'Complete',
} = defineProps<{
  items: {
    id: string;
    title: string;
    done: boolean;
    owner?: string;
    due?: string;
    status?: string;
    readonly?: boolean;
  }[];
  label?: string;
  completeLabel?: string;
}>();
const emit = defineEmits<{
  complete: [value: { id: string; done: boolean }];
  open: [id: string];
}>();
</script>
<template>
  <section class="biss-task-list" :aria-label="label">
    <div v-for="item in items" :key="item.id" :data-done="item.done">
      <input
        type="checkbox"
        :checked="item.done"
        :disabled="item.readonly"
        :aria-label="completeLabel + ' ' + item.title"
        @change="emit('complete', { id: item.id, done: !item.done })"
      /><button type="button" class="biss-task-title" @click="emit('open', item.id)">
        {{ item.title }}</button
      ><small v-if="item.status">{{ item.status }}</small
      ><BissAvatar v-if="item.owner" :name="item.owner" :size="22" /><time
        v-if="item.due"
        :datetime="item.due"
        >{{ item.due }}</time
      >
    </div>
  </section>
</template>
