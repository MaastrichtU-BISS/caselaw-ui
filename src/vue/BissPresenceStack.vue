<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import BissAvatar from './BissAvatar.vue';
import type { BissPerson } from '../library-types';
const {
  people,
  limit = 4,
  size = 22,
  label = 'People here',
  selfId = undefined,
} = defineProps<{
  people: BissPerson[];
  limit?: number;
  size?: number;
  label?: string;
  selfId?: string | undefined;
}>();

const others = computed(() => people.filter((p) => p.id !== selfId));
</script>
<template>
  <div class="biss-presence" role="group" :aria-label="label">
    <BissAvatar
      v-for="person in others.slice(0, Math.max(0, limit))"
      :key="person.id"
      :name="person.name"
      :size="size"
      :title="person.name"
    /><span
      v-if="others.length > limit"
      :title="
        others
          .slice(limit)
          .map((p) => p.name)
          .join(', ')
      "
      >+{{ others.length - limit }}</span
    ><slot />
  </div>
</template>
