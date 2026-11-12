<script setup lang="ts">
import { useId } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import BissSelectPicker from './BissSelectPicker.vue';
import BissSegmentedControl from './BissSegmentedControl.vue';
import type { BissFilterField, BissFilterRule } from '../core/types';
const {
  fields,
  rules = [],
  match = 'all',
  label = 'Filters',
  addLabel = 'Add filter',
  removeLabel = 'Remove filter',
  allLabel = 'Match all',
  anyLabel = 'Match any',
} = defineProps<{
  fields: BissFilterField[];
  rules?: BissFilterRule[];
  match?: 'all' | 'any';
  label?: string;
  addLabel?: string;
  removeLabel?: string;
  allLabel?: string;
  anyLabel?: string;
}>();
const emit = defineEmits<{ change: [rules: BissFilterRule[]]; match: [value: 'all' | 'any'] }>();
const uid = useId();
let sequence = 0;
function patch(id: string, p: Partial<BissFilterRule>) {
  emit(
    'change',
    rules.map((r) => (r.id === id ? { ...r, ...p } : r)),
  );
}
function add() {
  const field = fields[0];
  if (field)
    emit('change', [
      ...rules,
      {
        id: uid + '-' + sequence++,
        field: field.key,
        operator: field.operators[0]?.value ?? '',
        value: '',
      },
    ]);
}
</script>
<template>
  <section class="biss-filter-builder" :aria-label="label">
    <header>
      <h3>{{ label }}</h3>
      <BissSegmentedControl
        :options="[
          { value: 'all', label: allLabel },
          { value: 'any', label: anyLabel },
        ]"
        :value="match"
        :label="label"
        @change="emit('match', $event as 'all' | 'any')"
      />
    </header>
    <div v-for="rule in rules" :key="rule.id" class="biss-filter-row">
      <BissSelectPicker
        label="Field"
        :value="rule.field"
        :options="fields.map((f) => ({ value: f.key, label: f.label }))"
        @change="
          patch(rule.id, {
            field: $event,
            operator: fields.find((f) => f.key === $event)?.operators[0]?.value ?? '',
          })
        "
      /><BissSelectPicker
        label="Operator"
        :value="rule.operator"
        :options="fields.find((f) => f.key === rule.field)?.operators ?? []"
        @change="patch(rule.id, { operator: $event })"
      /><input
        class="biss-input"
        :value="rule.value"
        aria-label="Filter value"
        @input="patch(rule.id, { value: ($event.target as HTMLInputElement).value })"
      /><button
        type="button"
        class="biss-header-action"
        :aria-label="removeLabel"
        @click="
          emit(
            'change',
            rules.filter((r) => r.id !== rule.id),
          )
        "
      >
        <BissIcon name="x" />
      </button>
    </div>
    <button class="biss-text-button" type="button" :disabled="!fields.length" @click="add">
      {{ addLabel }}
    </button>
  </section>
</template>
