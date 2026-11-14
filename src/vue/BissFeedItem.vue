<script setup lang="ts">
/**
 * One update in a feed: who wrote it and when, the body, files, link previews,
 * reactions and the reply count. The host owns the update: reacting emits `react`,
 * the reply button emits `comment`, and menu actions emit `action`.
 */
import { ref, useId } from 'vue';
import BissAvatar from './BissAvatar.vue';
import BissIcon from './BissIcon.vue';
import BissMenu from './BissMenu.vue';
import type { BissMenuItem } from '../core/types';
import { linkHost, type BissFeedUpdate } from '../core/feed';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    item: BissFeedUpdate;
    /** Menu actions for this update, such as edit, pin or delete. */
    actions?: BissMenuItem[];
    /** Quick reactions offered by “Add reaction”. */
    emojis?: string[];
    /** Heading level of the optional title. */
    level?: 2 | 3 | 4;
    editedLabel?: string;
    pinnedLabel?: string;
    addReactionLabel?: string;
    /** Accessible name of a reaction. `{emoji}`, `{count}` and `{people}` are replaced. */
    reactionLabel?: string;
    /** The reply button. `{count}` is replaced. */
    commentsLabel?: string;
    replyLabel?: string;
    actionsLabel?: string;
    attachmentsLabel?: string;
    /** Accessible name of the article. `{author}` and `{time}` are replaced. */
    articleLabel?: string;
  }>(),
  {
    emojis: () => ['👍', '🎉', '❤️', '👀', '🙏'],
    level: 3,
    editedLabel: 'edited',
    pinnedLabel: 'Pinned',
    addReactionLabel: 'Add reaction',
    reactionLabel: '{emoji} {count}: {people}',
    commentsLabel: '{count} replies',
    replyLabel: 'Reply',
    actionsLabel: 'More',
    attachmentsLabel: 'Attachments',
    articleLabel: 'Update by {author}, {time}',
  },
);
const emit = defineEmits<{
  react: [value: { id: string; emoji: string }];
  comment: [id: string];
  action: [value: { id: string; key: string }];
}>();
defineSlots<{ default?: (props: { item: BissFeedUpdate }) => unknown }>();
const uid = useId();
const picking = ref(false);
function react(emoji: string) {
  emit('react', { id: props.item.id, emoji });
  picking.value = false;
}
function reactionName(r: { emoji: string; count: number; people?: string }) {
  return fillLabel(props.reactionLabel, { emoji: r.emoji, count: r.count, people: r.people ?? '' })
    .replace(/:\s*$/, '');
}
function closePicker(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !picking.value) return;
  event.stopPropagation();
  picking.value = false;
  document.getElementById(uid + '-add')?.focus();
}
</script>

<template>
  <article
    class="biss-feed-item"
    :data-pinned="item.pinned || undefined"
    :aria-label="fillLabel(articleLabel, { author: item.author, time: item.time })"
    @keydown="closePicker"
  >
    <header class="biss-feed-item-head">
      <span class="biss-feed-item-avatar" aria-hidden="true"
        ><BissAvatar :name="item.author" :size="28"
      /></span>
      <div class="biss-feed-item-who">
        <strong>{{ item.author }}</strong>
        <span class="biss-feed-item-meta"
          ><time :datetime="item.datetime">{{ item.time }}</time
          ><span v-if="item.edited">· {{ editedLabel }}</span
          ><span v-if="item.pinned" class="biss-feed-item-pin"
            ><BissIcon name="pin" />{{ pinnedLabel }}</span
          ></span
        >
      </div>
      <BissMenu
        v-if="actions?.length"
        :label="actionsLabel"
        :items="actions"
        :width="200"
        @pick="(menuItem) => emit('action', { id: item.id, key: menuItem.key })"
      />
    </header>
    <div class="biss-feed-item-body">
      <component :is="`h${level}`" v-if="item.title" class="biss-feed-item-title">{{
        item.title
      }}</component>
      <slot :item="item"
        ><p v-if="item.body" class="biss-feed-item-text">{{ item.body }}</p></slot
      >
      <ul v-if="item.attachments?.length" class="biss-feed-files" :aria-label="attachmentsLabel">
        <li v-for="file in item.attachments" :key="file.id">
          <component :is="file.href ? 'a' : 'span'" class="biss-feed-file" :href="file.href"
            ><span class="biss-feed-file-icon"><BissIcon name="file" /></span
            ><span class="biss-feed-file-name"
              ><span>{{ file.name }}</span
              ><small v-if="file.size || file.type"
                >{{ [file.size, file.type].filter(Boolean).join(' · ') }}</small
              ></span
            ></component
          >
        </li>
      </ul>
      <div v-if="item.links?.length" class="biss-feed-links">
        <a
          v-for="link in item.links"
          :key="link.url"
          class="biss-feed-link"
          :href="link.url"
          rel="noopener noreferrer nofollow"
          ><span class="biss-feed-link-text"
            ><small>{{ link.site || linkHost(link.url) }}</small
            ><strong>{{ link.title || link.url }}</strong
            ><span v-if="link.description">{{ link.description }}</span></span
          ><img v-if="link.image" :src="link.image" alt="" loading="lazy"
        /></a>
      </div>
    </div>
    <footer class="biss-feed-item-foot">
      <button
        v-for="r in item.reactions ?? []"
        :key="r.emoji"
        type="button"
        class="biss-feed-reaction"
        :aria-pressed="!!r.reacted"
        :aria-label="reactionName(r)"
        :title="r.people || undefined"
        @click="react(r.emoji)"
      >
        <span aria-hidden="true">{{ r.emoji }}</span
        ><span class="biss-feed-reaction-count">{{ r.count }}</span>
      </button>
      <span class="biss-feed-picker">
        <button
          :id="uid + '-add'"
          type="button"
          class="biss-feed-action"
          :aria-label="addReactionLabel"
          :title="addReactionLabel"
          :aria-expanded="picking"
          :aria-controls="uid + '-emojis'"
          @click="picking = !picking"
        >
          <BissIcon name="smile" />
        </button>
        <span
          v-if="picking"
          :id="uid + '-emojis'"
          class="biss-feed-emojis"
          role="group"
          :aria-label="addReactionLabel"
        >
          <button
            v-for="emoji in emojis"
            :key="emoji"
            type="button"
            :aria-pressed="!!item.reactions?.some((r) => r.emoji === emoji && r.reacted)"
            @click="react(emoji)"
          >
            {{ emoji }}
          </button>
        </span>
      </span>
      <button type="button" class="biss-feed-action biss-feed-comments" @click="emit('comment', item.id)">
        <BissIcon name="reply" />{{
          item.comments ? fillLabel(commentsLabel, { count: item.comments }) : replyLabel
        }}
      </button>
    </footer>
  </article>
</template>
