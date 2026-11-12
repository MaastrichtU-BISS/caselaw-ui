<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../icon-names';
const { label, disabled = false } = defineProps<{ label: string; disabled?: boolean }>();
const emit = defineEmits<{ add: [] }>();
</script>
<template>
  <button class="biss-table-add" type="button" :disabled="disabled" @click="emit('add')">
    <BissIcon name="plus" />{{ label }}
  </button>
</template>
