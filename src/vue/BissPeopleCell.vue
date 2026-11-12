<script setup lang="ts">
import BissAvatar from './BissAvatar.vue';
import type { BissPerson } from '../core/types';
const {
  people,
  empty = 'Unassigned',
  limit = 3,
} = defineProps<{ people: BissPerson[]; empty?: string; limit?: number }>();
</script>
<template>
  <span class="biss-people-cell"
    ><span v-for="person in people.slice(0, limit)" :key="person.id"
      ><BissAvatar :name="person.name" :size="20" />{{ person.name }}</span
    ><small v-if="people.length > limit">+{{ people.length - limit }}</small
    ><span v-if="!people.length" class="biss-muted">{{ empty }}</span></span
  >
</template>
