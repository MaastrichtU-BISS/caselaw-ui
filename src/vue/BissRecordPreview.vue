<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import { safeLink } from '../core/collections';
const {
  title,
  kind,
  description = undefined,
  href = undefined,
  restricted = false,
  restrictedLabel = 'A record you cannot access',
  icon = 'file',
} = defineProps<{
  title: string;
  kind: string;
  description?: string | undefined;
  href?: string | undefined;
  restricted?: boolean;
  restrictedLabel?: string;
  icon?: BissIconName;
}>();
</script>
<template>
  <article class="biss-record-preview">
    <template v-if="restricted"
      ><BissIcon name="lock" /><span>{{ restrictedLabel }}</span></template
    ><template v-else
      ><BissIcon :name="icon" />
      <div>
        <small>{{ kind }}</small
        ><a v-if="href" :href="safeLink(href)">{{ title }}</a
        ><b v-else>{{ title }}</b>
        <p v-if="description">{{ description }}</p>
      </div></template
    >
  </article>
</template>
