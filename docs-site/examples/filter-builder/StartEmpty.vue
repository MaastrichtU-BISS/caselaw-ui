<script setup lang="ts">
import { ref } from 'vue';
import { BissFilterBuilder, type BissFilterField, type BissFilterRule } from 'biss-ui/vue';

const fields: BissFilterField[] = [
  { key: 'team', label: 'Team', operators: [{ value: 'is', label: 'is' }] },
  { key: 'deadline', label: 'Deadline', operators: [{ value: 'before', label: 'before' }, { value: 'after', label: 'after' }] },
];

const rules = ref<BissFilterRule[]>([]);
const match = ref<'all' | 'any'>('any');
</script>

<template>
  <BissFilterBuilder
    label="Task filters"
    :fields="fields"
    :rules="rules"
    :match="match"
    @change="rules = $event"
    @match="match = $event"
  />
</template>
