<script setup lang="ts">
import BissAvatar from './BissAvatar.vue';
import BissCommentComposer from './BissCommentComposer.vue';
import type { BissComment } from '../core/types';
const {
  composerLabel = 'Write a comment',
  submitLabel = 'Post comment',

  items,
  label = 'Discussion',
  resolved = false,
  readonly = false,
  resolveLabel = 'Resolve',
  reopenLabel = 'Reopen',
} = defineProps<{
  composerLabel?: string;
  submitLabel?: string;

  items: BissComment[];
  label?: string;
  resolved?: boolean;
  readonly?: boolean;
  resolveLabel?: string;
  reopenLabel?: string;
}>();
const emit = defineEmits<{ resolve: [value: boolean]; comment: [body: string] }>();
</script>
<template>
  <section class="biss-comment-thread" :aria-label="label">
    <header>
      <h3>
        {{ label }} <small>{{ items.length }}</small>
      </h3>
      <button
        v-if="!readonly"
        type="button"
        class="biss-text-button"
        @click="emit('resolve', !resolved)"
      >
        {{ resolved ? reopenLabel : resolveLabel }}
      </button>
    </header>
    <ol>
      <li v-for="item in items" :key="item.id">
        <BissAvatar :name="item.author" :size="26" />
        <div>
          <b>{{ item.author }}</b><small>{{ item.time }}</small>
          <p>{{ item.body }}</p>
        </div>
      </li>
    </ol>
    <BissCommentComposer
      :label="composerLabel"
      :submit-label="submitLabel"
      v-if="!readonly && !resolved"
      @submit="emit('comment', $event)"
    />
  </section>
</template>
