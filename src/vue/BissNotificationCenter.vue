<script setup lang="ts">
/**
 * A bell with the unread count that opens the latest notifications in a popover.
 * The host supplies the notices and owns read state: picking a row emits `pick`,
 * “Mark all as read” emits `read-all`, and the footer links to the full inbox.
 */
import { computed, useId } from 'vue';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';
import BissIcon from './BissIcon.vue';
import BissNoticeRow from './BissNoticeRow.vue';
import BissButton from './BissButton.vue';
import type { BissNotice } from '../core/types';
import { countLabel, fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    items: BissNotice[];
    /** Total unread, when the host knows more than the notices shown. Defaults to the unread items. */
    unread?: number;
    /** Shows at most this many notices; link to the full inbox for the rest. */
    max?: number;
    loading?: boolean;
    /** A failure message; replaces the list. */
    error?: string;
    label?: string;
    /** Accessible name of the bell when there are unread notices. `{count}` is replaced. */
    unreadLabel?: string;
    markAllLabel?: string;
    emptyTitle?: string;
    emptyCopy?: string;
    loadingLabel?: string;
    retryLabel?: string;
    /** Footer link text. Pass an empty string to hide the footer. */
    seeAllLabel?: string;
    /** Renders the footer as a link. Without it the footer emits `more`. */
    seeAllHref?: string;
    width?: number;
    align?: 'start' | 'center' | 'end';
    /** Render the panel in `<body>`, outside clipping ancestors. */
    portal?: boolean;
  }>(),
  {
    max: 8,
    loading: false,
    label: 'Notifications',
    unreadLabel: 'Notifications, {count} unread',
    markAllLabel: 'Mark all as read',
    emptyTitle: 'You’re all caught up',
    emptyCopy: 'Mentions, assignments and deadlines appear here.',
    loadingLabel: 'Loading notifications…',
    retryLabel: 'Try again',
    seeAllLabel: 'See all notifications',
    width: 380,
    align: 'end',
    portal: false,
  },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{
  pick: [item: BissNotice];
  'read-all': [];
  more: [];
  retry: [];
}>();
const uid = useId();
const count = computed(
  () => props.unread ?? props.items.filter((item) => item.unread).length,
);
const shown = computed(() => props.items.slice(0, Math.max(0, props.max)));
const bellLabel = computed(() =>
  count.value ? fillLabel(props.unreadLabel, { count: count.value }) : props.label,
);
function pick(item: BissNotice) {
  emit('pick', item);
  open.value = false;
}
/** Focus the panel itself, so Tab reaches “Mark all as read” and the rows in order. */
function focusPanel(event: Event) {
  event.preventDefault();
  (event.target as HTMLElement | null)?.focus({ preventScroll: true });
}
function more() {
  emit('more');
  open.value = false;
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      class="biss-header-action biss-bell"
      :aria-label="bellLabel"
      :title="label"
      :data-open="open || undefined"
      ><BissIcon name="bell" /><span v-if="count" class="biss-bell-count" aria-hidden="true">{{
        countLabel(count)
      }}</span></PopoverTrigger
    >
    <PopoverPortal :disabled="!portal">
      <PopoverContent
        class="biss-block-popover biss-notification-panel"
        :align="align"
        :side-offset="6"
        :collision-padding="8"
        :aria-labelledby="uid + '-title'"
        tabindex="-1"
        @open-auto-focus="focusPanel"
        :style="{ width: width + 'px' }"
      >
        <header class="biss-notification-head">
          <h2 :id="uid + '-title'">{{ label }}</h2>
          <BissButton
            v-if="count && !loading && !error"
            variant="ghost"
            size="sm"
            @click="emit('read-all')"
            ><BissIcon name="check" />{{ markAllLabel }}</BissButton
          >
        </header>
        <div v-if="loading" class="biss-notification-loading" role="status">
          <span class="biss-visually-hidden">{{ loadingLabel }}</span>
          <span v-for="n in 3" :key="n" class="biss-notification-skeleton" aria-hidden="true"
            ><i /><span><b /><b /></span
          ></span>
        </div>
        <div v-else-if="error" class="biss-notification-state" role="alert">
          <BissIcon name="alert" /><strong>{{ error }}</strong>
          <BissButton variant="secondary" size="sm" @click="emit('retry')">{{
            retryLabel
          }}</BissButton>
        </div>
        <ul v-else-if="shown.length" class="biss-notification-list">
          <li v-for="item in shown" :key="item.id">
            <BissNoticeRow
              :title="item.title"
              :detail="item.detail"
              :meta="item.meta"
              :unread="item.unread"
              @click="pick(item)"
              ><template #icon
                ><span class="biss-notice-icon" :data-tone="item.tone ?? 'info'"
                  ><BissIcon :name="item.icon ?? 'bell'" /></span></template
            ></BissNoticeRow>
          </li>
        </ul>
        <div v-else class="biss-notification-state">
          <BissIcon name="bell" /><strong>{{ emptyTitle }}</strong
          ><span>{{ emptyCopy }}</span>
        </div>
        <slot name="footer">
          <template v-if="seeAllLabel">
            <a v-if="seeAllHref" class="biss-notification-foot" :href="seeAllHref" @click="open = false"
              >{{ seeAllLabel }}<BissIcon name="chev"
            /></a>
            <button v-else type="button" class="biss-notification-foot" @click="more">
              {{ seeAllLabel }}<BissIcon name="chev" />
            </button>
          </template>
        </slot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
