<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import type { BissAttachment } from '../core/types';
const {
  items,
  label = 'Attachments',
  removeLabel = 'Remove',
} = defineProps<{ items: BissAttachment[]; label?: string; removeLabel?: string }>();
const emit = defineEmits<{ remove: [id: string] }>();
</script>
<template>
  <ul class="biss-attachment-list" :aria-label="label">
    <li v-for="item in items" :key="item.id">
      <BissIcon name="paperclip" />
      <div class="biss-grow">
        <a v-if="item.href" :href="item.href">{{ item.name }}</a
        ><span v-else>{{ item.name }}</span
        ><small v-if="item.size">{{ item.size }}</small>
      </div>
      <button
        v-if="item.removable"
        type="button"
        class="biss-header-action"
        :aria-label="removeLabel + ' ' + item.name"
        @click="emit('remove', item.id)"
      >
        <BissIcon name="x" />
      </button>
    </li>
  </ul>
</template>
