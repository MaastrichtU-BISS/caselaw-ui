<script setup lang="ts">
import { useId } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
const { title, open = false } = defineProps<{ title: string; open?: boolean }>();
const emit = defineEmits<{ change: [value: boolean] }>();
const uid = useId();
</script>
<template>
  <div class="biss-disclosure">
    <button
      type="button"
      class="biss-disclosure-head"
      :aria-expanded="open"
      :aria-controls="uid"
      @click="emit('change', !open)"
    >
      <BissIcon :name="open ? 'chevLeft' : 'chev'" />{{ title }}
    </button>
    <div v-if="open" :id="uid" class="biss-disclosure-body"><slot /></div>
  </div>
</template>
