<script setup lang="ts">
/**
 * A stream of updates with a composer on top. The host owns the updates and
 * persistence: posting emits `post` with the text, reactions, replies and menu
 * actions bubble up from each item, and “Load more” emits `more`.
 */
import { computed, useId } from 'vue';
import BissButton from './BissButton.vue';
import BissIcon from './BissIcon.vue';
import BissFeedItem from './BissFeedItem.vue';
import type { BissMenuItem } from '../core/types';
import type { BissFeedUpdate } from '../core/feed';

const props = withDefaults(
  defineProps<{
    items: BissFeedUpdate[];
    /** Menu actions offered on every update. */
    actions?: BissMenuItem[];
    /** Show the composer. */
    composer?: boolean;
    /** A post is being saved; the composer waits. */
    posting?: boolean;
    loading?: boolean;
    /** A failure message; replaces the list. */
    error?: string;
    /** More updates exist; shows “Load more”. */
    hasMore?: boolean;
    loadingMore?: boolean;
    label?: string;
    composerLabel?: string;
    placeholder?: string;
    postLabel?: string;
    /** Shortcut hint beside the post button. */
    shortcutLabel?: string;
    emptyTitle?: string;
    emptyCopy?: string;
    loadingLabel?: string;
    retryLabel?: string;
    moreLabel?: string;
  }>(),
  {
    composer: true,
    posting: false,
    loading: false,
    hasMore: false,
    loadingMore: false,
    label: 'Updates',
    composerLabel: 'Write an update',
    placeholder: 'Share progress, a decision or news with the team…',
    postLabel: 'Post',
    shortcutLabel: '⌘ or Ctrl + Enter to post',
    emptyTitle: 'No updates yet',
    emptyCopy: 'Updates about progress, decisions and news appear here.',
    loadingLabel: 'Loading updates…',
    retryLabel: 'Try again',
    moreLabel: 'Load more updates',
  },
);
const draft = defineModel<string>('draft', { default: '' });
const emit = defineEmits<{
  post: [text: string];
  react: [value: { id: string; emoji: string }];
  comment: [id: string];
  action: [value: { id: string; key: string }];
  more: [];
  retry: [];
}>();
defineSlots<{ item?: (props: { item: BissFeedUpdate }) => unknown }>();
const uid = useId();
const canPost = computed(() => !!draft.value.trim() && !props.posting);
function post() {
  if (!canPost.value) return;
  emit('post', draft.value.trim());
  draft.value = '';
}
function keydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    post();
  }
}
</script>

<template>
  <section class="biss-feed" :aria-label="label" :aria-busy="loading || undefined">
    <form v-if="composer" class="biss-feed-composer" @submit.prevent="post">
      <label :for="uid + '-draft'" class="biss-visually-hidden">{{ composerLabel }}</label>
      <textarea
        :id="uid + '-draft'"
        v-model="draft"
        class="biss-textarea"
        rows="2"
        :placeholder="placeholder"
        :readonly="posting"
        :aria-describedby="uid + '-hint'"
        @keydown="keydown"
      />
      <div class="biss-feed-composer-row">
        <small :id="uid + '-hint'">{{ shortcutLabel }}</small>
        <BissButton type="submit" size="sm" :loading="posting" :disabled="!draft.trim()">{{
          postLabel
        }}</BissButton>
      </div>
    </form>
    <div v-if="loading" class="biss-feed-skeleton" role="status">
      <span class="biss-visually-hidden">{{ loadingLabel }}</span>
      <span v-for="n in 2" :key="n" aria-hidden="true"><i /><span><b /><b /><b /></span></span>
    </div>
    <div v-else-if="error" class="biss-feed-state" role="alert">
      <BissIcon name="alert" /><strong>{{ error }}</strong>
      <BissButton variant="secondary" size="sm" @click="emit('retry')">{{ retryLabel }}</BissButton>
    </div>
    <div v-else-if="!items.length" class="biss-feed-state">
      <BissIcon name="chat" /><strong>{{ emptyTitle }}</strong><span>{{ emptyCopy }}</span>
    </div>
    <template v-else>
      <div class="biss-feed-list">
        <template v-for="item in items" :key="item.id">
          <slot name="item" :item="item">
            <BissFeedItem
              :item="item"
              :actions="actions"
              @react="emit('react', $event)"
              @comment="emit('comment', $event)"
              @action="emit('action', $event)"
            />
          </slot>
        </template>
      </div>
      <BissButton
        v-if="hasMore"
        class="biss-feed-more"
        variant="ghost"
        size="sm"
        :loading="loadingMore"
        @click="emit('more')"
        >{{ moreLabel }}</BissButton
      >
    </template>
  </section>
</template>
