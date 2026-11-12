<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const {
  title,
  body,
  rationale = undefined,
  changes = [],
  busy = false,
  approveLabel = 'Apply change',
  dismissLabel = 'Dismiss',
} = defineProps<{
  title: string;
  body: string;
  rationale?: string | undefined;
  changes?: { label: string; before: string; after: string }[];
  busy?: boolean;
  approveLabel?: string;
  dismissLabel?: string;
}>();
const emit = defineEmits<{ approve: []; dismiss: [] }>();
</script>
<template>
  <article class="biss-proposal-card">
    <header>
      <BissIcon name="spark" />
      <h3>{{ title }}</h3>
    </header>
    <p>{{ body }}</p>
    <details v-if="rationale">
      <summary>Why this change</summary>
      <p>{{ rationale }}</p>
    </details>
    <dl v-if="changes.length">
      <div v-for="(change, i) in changes" :key="i">
        <dt>{{ change.label }}</dt>
        <dd>
          <del>{{ change.before }}</del
          ><BissIcon name="chev" /><span>{{ change.after }}</span>
        </dd>
      </div>
    </dl>
    <footer>
      <button type="button" class="biss-button" :disabled="busy" @click="emit('approve')">
        {{ approveLabel }}</button
      ><button
        type="button"
        class="biss-button biss-button-ghost"
        :disabled="busy"
        @click="emit('dismiss')"
      >
        {{ dismissLabel }}
      </button>
    </footer>
  </article>
</template>
