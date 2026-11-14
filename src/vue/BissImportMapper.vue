<script setup lang="ts">
/**
 * Match the columns of an imported file to the fields they fill. Columns are
 * matched by name on first render; people change any match with a plain select,
 * and a field moves when it is chosen for another column. Required fields that
 * no column fills are listed above the submit action. The host owns the file,
 * the preview and the import itself.
 */
import { computed, onMounted, ref, useId } from 'vue';
import BissButton from './BissButton.vue';
import BissIcon from './BissIcon.vue';
import {
  assignField,
  autoMatch,
  validateMapping,
  type BissImportColumn,
  type BissImportField,
  type BissImportMapping,
} from '../core/import-mapping';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    columns: BissImportColumn[];
    fields: BissImportField[];
    /** Suggest fields for undecided columns on first render. */
    autoMatchOnStart?: boolean;
    /** Step names for the header, for example Upload, Match columns, Review. */
    steps?: string[];
    /** The current step, starting at 1. */
    step?: number;
    title?: string;
    description?: string;
    busy?: boolean;
    columnLabel?: string;
    samplesLabel?: string;
    fieldLabel?: string;
    skipLabel?: string;
    autoMatchLabel?: string;
    suggestedLabel?: string;
    requiredLabel?: string;
    /** Accessible name of each row's select. `{column}` is replaced. */
    selectLabel?: string;
    /** `{fields}` is replaced by the unmapped required fields. */
    missingLabel?: string;
    /** `{field}` and `{columns}` are replaced. */
    conflictLabel?: string;
    /** `{count}` and `{total}` are replaced. */
    summaryLabel?: string;
    /** Announced when a field moves. `{field}` and `{column}` are replaced. */
    movedLabel?: string;
    stepsLabel?: string;
    noSamplesLabel?: string;
    submitLabel?: string;
  }>(),
  {
    autoMatchOnStart: true,
    busy: false,
    title: 'Match columns',
    columnLabel: 'Column in file',
    samplesLabel: 'Sample values',
    fieldLabel: 'Imports to',
    skipLabel: 'Don’t import',
    autoMatchLabel: 'Auto-match',
    suggestedLabel: 'Suggested',
    requiredLabel: 'required',
    selectLabel: 'Field for {column}',
    missingLabel: 'Choose a column for {fields}.',
    conflictLabel: '{field} is chosen for {columns}.',
    summaryLabel: '{count} of {total} columns will be imported.',
    movedLabel: '{field} moved to {column}.',
    stepsLabel: 'Import steps',
    noSamplesLabel: 'No values',
    submitLabel: 'Continue',
  },
);
const mapping = defineModel<BissImportMapping>('mapping', { default: () => ({}) });
const emit = defineEmits<{
  change: [mapping: BissImportMapping];
  submit: [mapping: BissImportMapping];
}>();
const uid = useId();
const touched = ref(new Set<string>());
/** Columns the host had already decided; the rest show as suggestions until changed. */
const decided = ref(new Set(Object.keys(mapping.value)));
const attempted = ref(false);
const announcement = ref('');
const summary = ref<HTMLElement | null>(null);

const suggested = computed(() => autoMatch(props.columns, props.fields, mapping.value));
/** The mapping the rows show: the host's decisions, completed by suggestions. */
const current = computed<BissImportMapping>(() =>
  props.autoMatchOnStart
    ? suggested.value
    : Object.fromEntries(props.columns.map((c) => [c.key, mapping.value[c.key] ?? null])),
);
const result = computed(() => validateMapping(current.value, props.fields, props.columns));
const fieldName = (key: string) => props.fields.find((f) => f.key === key)?.label ?? key;
const samples = (column: BissImportColumn) =>
  (column.samples ?? [])
    .filter((v) => v !== null && v !== '')
    .slice(0, 3)
    .map(String);
const isSuggested = (column: string) =>
  !!current.value[column] && !touched.value.has(column) && !decided.value.has(column);
const usedBy = (field: string, column: string) =>
  props.columns.find((c) => c.key !== column && current.value[c.key] === field)?.key;

function commit(next: BissImportMapping) {
  mapping.value = next;
  emit('change', next);
}
function choose(column: string, value: string) {
  const field = value || null;
  const previous = field ? usedBy(field, column) : undefined;
  touched.value = new Set([...touched.value, column]);
  commit(assignField(current.value, column, field));
  announcement.value =
    field && previous ? fillLabel(props.movedLabel, { field: fieldName(field), column }) : '';
}
/** Suggest again for every column nobody chose a field for; chosen fields stay. */
function rematch() {
  const kept = Object.fromEntries(
    Object.entries(mapping.value).filter(
      ([column, field]) =>
        field !== null && (touched.value.has(column) || decided.value.has(column)),
    ),
  );
  touched.value = new Set(Object.keys(kept));
  commit(autoMatch(props.columns, props.fields, kept));
}
function submit() {
  attempted.value = true;
  if (!result.value.valid) {
    summary.value?.focus();
    return;
  }
  emit('submit', current.value);
}
onMounted(() => {
  if (!props.autoMatchOnStart) return;
  const next = current.value;
  if (props.columns.some((c) => (mapping.value[c.key] ?? null) !== next[c.key])) commit(next);
});
</script>

<template>
  <section class="biss-import-mapper" :aria-labelledby="uid + '-title'" :aria-busy="busy || undefined">
    <ol v-if="steps?.length" class="biss-import-steps" :aria-label="stepsLabel">
      <li
        v-for="(name, index) in steps"
        :key="name"
        :data-state="index + 1 < (step ?? 1) ? 'done' : index + 1 === (step ?? 1) ? 'current' : 'next'"
        :aria-current="index + 1 === (step ?? 1) ? 'step' : undefined"
      >
        <span aria-hidden="true"
          ><BissIcon v-if="index + 1 < (step ?? 1)" name="check" /><template v-else>{{
            index + 1
          }}</template></span
        >{{ name }}
      </li>
    </ol>
    <header class="biss-import-head">
      <div class="biss-grow">
        <h2 :id="uid + '-title'">{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <BissButton variant="secondary" size="sm" :disabled="busy" @click="rematch"
        ><BissIcon name="spark" />{{ autoMatchLabel }}</BissButton
      >
    </header>
    <div class="biss-import-table" role="table" :aria-labelledby="uid + '-title'">
      <div class="biss-import-row biss-import-row-head" role="row">
        <span role="columnheader">{{ columnLabel }}</span>
        <span role="columnheader">{{ samplesLabel }}</span>
        <span aria-hidden="true" />
        <span role="columnheader">{{ fieldLabel }}</span>
      </div>
      <div
        v-for="column in columns"
        :key="column.key"
        class="biss-import-row"
        role="row"
        :data-skipped="!current[column.key] || undefined"
        :data-conflict="
          result.conflicts.some((c) => c.columns.includes(column.key)) || undefined
        "
      >
        <span role="cell" class="biss-import-column">{{ column.key }}</span>
        <span role="cell" class="biss-import-samples">{{
          samples(column).join(' · ') || noSamplesLabel
        }}</span>
        <span class="biss-import-arrow" aria-hidden="true"><BissIcon name="chev" /></span>
        <span role="cell" class="biss-import-pick">
          <select
            class="biss-select"
            :value="current[column.key] ?? ''"
            :aria-label="fillLabel(selectLabel, { column: column.key })"
            :disabled="busy"
            @change="choose(column.key, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">{{ skipLabel }}</option>
            <option v-for="field in fields" :key="field.key" :value="field.key">
              {{ field.label }}{{ field.required ? ` (${requiredLabel})` : ''
              }}{{ usedBy(field.key, column.key) ? ` · ${usedBy(field.key, column.key)}` : '' }}
            </option>
          </select>
          <span v-if="isSuggested(column.key)" class="biss-import-tag">{{ suggestedLabel }}</span>
        </span>
      </div>
    </div>
    <footer class="biss-import-foot">
      <div
        ref="summary"
        class="biss-import-summary"
        tabindex="-1"
        :role="attempted && !result.valid ? 'alert' : 'status'"
        :data-invalid="!result.valid || undefined"
      >
        <p v-if="result.missing.length">
          <BissIcon name="alert" />{{
            fillLabel(missingLabel, { fields: result.missing.map((f) => f.label).join(', ') })
          }}
        </p>
        <p v-for="conflict in result.conflicts" :key="conflict.field.key">
          <BissIcon name="alert" />{{
            fillLabel(conflictLabel, {
              field: conflict.field.label,
              columns: conflict.columns.join(', '),
            })
          }}
        </p>
        <p v-if="result.valid">
          <BissIcon name="check" />{{
            fillLabel(summaryLabel, { count: result.mapped, total: columns.length })
          }}
        </p>
      </div>
      <BissButton :loading="busy" @click="submit">{{ submitLabel }}</BissButton>
    </footer>
    <p class="biss-visually-hidden" aria-live="polite">{{ announcement }}</p>
  </section>
</template>
