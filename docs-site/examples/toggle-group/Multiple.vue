<script setup lang="ts">
import { ref } from 'vue';
import { BissToggleGroup } from 'biss-ui/vue';

const marks = ref<string[]>(['bold']);
const items = [
  { value: 'bold', label: 'Bold', icon: 'bold' as const },
  { value: 'italic', label: 'Italic', icon: 'italic' as const },
  { value: 'strike', label: 'Strikethrough', icon: 'strike' as const },
];
</script>

<template>
  <BissToggleGroup
    v-model="marks"
    :items="items"
    label="Text style"
    type="multiple"
    icon-only
    size="sm"
  />
</template>
