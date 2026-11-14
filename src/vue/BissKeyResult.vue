<script setup lang="ts">
/**
 * One key result: where it started, where it is, where it should end, how far
 * along that is and how confident the owner is. “Check in” opens an inline form
 * for the new value, confidence and a note; submitting emits `checkin`. The host
 * stores the check-in and passes the new values back.
 */
import { computed, nextTick, ref, useId, watch } from 'vue';
import BissButton from './BissButton.vue';
import BissGoalBar from './BissGoalBar.vue';
import BissIcon from './BissIcon.vue';
import {
  formatKeyResultValue,
  keyResultProgress,
  parseKeyResultValue,
  type BissConfidence,
  type BissKeyResultCheckin,
  type BissKeyResultFormat,
  type BissKeyResultLastCheckin,
} from '../core/key-results';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    title: string;
    owner?: string;
    start: number;
    current: number;
    target: number;
    format?: BissKeyResultFormat;
    /** Unit after plain numbers, such as “papers”. */
    unit?: string;
    currency?: string;
    locale?: string;
    /** Formats every value; overrides `format`, `unit` and `currency`. */
    formatValue?: (value: number) => string;
    /** Expected progress by today, 0–1; drawn as a marker on the bar. */
    expected?: number;
    confidence?: BissConfidence;
    lastCheckin?: BissKeyResultLastCheckin;
    canCheckIn?: boolean;
    /** The check-in is being saved. */
    busy?: boolean;
    /** Heading level of the title. */
    level?: 2 | 3 | 4;
    confidenceLabels?: Record<BissConfidence, string>;
    /** Accessible name of the bar. `{title}` is replaced. */
    progressLabel?: string;
    ownerLabel?: string;
    startLabel?: string;
    targetLabel?: string;
    checkInLabel?: string;
    formTitle?: string;
    valueLabel?: string;
    confidenceLabel?: string;
    noteLabel?: string;
    notePlaceholder?: string;
    saveLabel?: string;
    cancelLabel?: string;
    invalidLabel?: string;
    noCheckinLabel?: string;
    /** `{time}` and `{author}` are replaced. */
    lastCheckinLabel?: string;
  }>(),
  {
    format: 'number',
    currency: 'EUR',
    canCheckIn: true,
    busy: false,
    level: 3,
    confidenceLabels: () => ({
      'on-track': 'On track',
      'at-risk': 'At risk',
      'off-track': 'Off track',
    }),
    progressLabel: 'Progress of {title}',
    ownerLabel: 'Owner',
    startLabel: 'Start',
    targetLabel: 'Target',
    checkInLabel: 'Check in',
    formTitle: 'New check-in',
    valueLabel: 'Current value',
    confidenceLabel: 'Confidence',
    noteLabel: 'Note',
    notePlaceholder: 'What changed since the last check-in?',
    saveLabel: 'Save check-in',
    cancelLabel: 'Cancel',
    invalidLabel: 'Enter a number, for example 12 or 12.5.',
    noCheckinLabel: 'No check-ins yet',
    lastCheckinLabel: '{time} by {author}',
  },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ checkin: [value: BissKeyResultCheckin]; cancel: [] }>();
const uid = useId();
const valueInput = ref<HTMLInputElement | null>(null);
const toggle = ref<HTMLElement | null>(null);
const draftValue = ref('');
const draftConfidence = ref<BissConfidence>('on-track');
const draftNote = ref('');
const invalid = ref(false);
const levels: BissConfidence[] = ['on-track', 'at-risk', 'off-track'];

const progress = computed(() => keyResultProgress(props.start, props.current, props.target));
const percent = computed(() =>
  progress.value === null ? '–' : Math.round(progress.value * 100) + '%',
);
const tone = computed(() =>
  props.confidence === 'off-track'
    ? 'danger'
    : props.confidence === 'at-risk'
      ? 'warning'
      : props.confidence === 'on-track'
        ? 'success'
        : 'primary',
);
const show = (value: number) =>
  props.formatValue
    ? props.formatValue(value)
    : formatKeyResultValue(value, {
        format: props.format,
        unit: props.unit,
        currency: props.currency,
        locale: props.locale,
      });
const lastLine = computed(() =>
  props.lastCheckin
    ? props.lastCheckin.author
      ? fillLabel(props.lastCheckinLabel, {
          time: props.lastCheckin.time,
          author: props.lastCheckin.author,
        })
      : props.lastCheckin.time
    : '',
);

watch(open, async (value) => {
  if (!value) return;
  draftValue.value = String(props.current);
  draftConfidence.value = props.confidence ?? 'on-track';
  draftNote.value = '';
  invalid.value = false;
  await nextTick();
  valueInput.value?.select();
}, { immediate: true });
function cancel() {
  open.value = false;
  emit('cancel');
  nextTick(() => toggle.value?.focus());
}
function submit() {
  const value = parseKeyResultValue(draftValue.value);
  invalid.value = value === null;
  if (value === null) {
    valueInput.value?.focus();
    return;
  }
  emit('checkin', { value, confidence: draftConfidence.value, note: draftNote.value.trim() });
}
function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation();
    cancel();
  }
}
</script>

<template>
  <article class="biss-key-result" :data-open="open || undefined" :aria-labelledby="uid + '-title'">
    <div class="biss-key-result-row">
      <div class="biss-key-result-name">
        <component :is="`h${level}`" :id="uid + '-title'">{{ title }}</component>
        <small v-if="owner"
          ><span class="biss-visually-hidden">{{ ownerLabel }}: </span
          ><BissIcon name="user" />{{ owner }}</small
        >
      </div>
      <div class="biss-key-result-metric">
        <p>
          <strong>{{ show(current) }}</strong
          ><span>/ {{ show(target) }}</span
          ><em>{{ percent }}</em>
        </p>
        <BissGoalBar
          :value="progress"
          :expected="expected"
          :tone="tone"
          :height="6"
          :label="fillLabel(progressLabel, { title })"
        />
        <small
          >{{ startLabel }} {{ show(start) }} · {{ targetLabel }} {{ show(target) }}</small
        >
      </div>
      <div class="biss-key-result-confidence">
        <span v-if="confidence" class="biss-key-result-pill" :data-confidence="confidence"
          ><i aria-hidden="true" />{{ confidenceLabels[confidence] }}</span
        >
        <small :title="lastCheckin?.note">{{ lastLine || noCheckinLabel }}</small>
      </div>
      <div class="biss-key-result-actions">
        <button
          v-if="canCheckIn"
          ref="toggle"
          type="button"
          class="biss-button biss-button-secondary biss-button-sm"
          :aria-expanded="open"
          :aria-controls="uid + '-form'"
          @click="open ? cancel() : (open = true)"
        >
          <span class="biss-button-label">{{ checkInLabel }}</span>
        </button>
      </div>
    </div>
    <p v-if="lastCheckin?.note && !open" class="biss-key-result-note">“{{ lastCheckin.note }}”</p>
    <form
      v-if="open"
      :id="uid + '-form'"
      class="biss-key-result-form"
      :aria-label="formTitle"
      @submit.prevent="submit"
      @keydown="keydown"
    >
      <div class="biss-key-result-fields">
        <label class="biss-key-result-field">
          <span>{{ valueLabel }}</span>
          <input
            ref="valueInput"
            v-model="draftValue"
            class="biss-input"
            inputmode="decimal"
            autocomplete="off"
            :aria-invalid="invalid || undefined"
            :aria-describedby="uid + '-value-help'"
          />
          <small :id="uid + '-value-help'" :data-invalid="invalid || undefined">{{
            invalid ? invalidLabel : `${startLabel} ${show(start)} · ${targetLabel} ${show(target)}`
          }}</small>
        </label>
        <fieldset class="biss-key-result-field">
          <legend>{{ confidenceLabel }}</legend>
          <div class="biss-key-result-choices">
            <label v-for="level in levels" :key="level" :data-confidence="level">
              <input v-model="draftConfidence" type="radio" :name="uid + '-confidence'" :value="level" />
              <i aria-hidden="true" />{{ confidenceLabels[level] }}
            </label>
          </div>
        </fieldset>
      </div>
      <label class="biss-key-result-field">
        <span>{{ noteLabel }}</span>
        <textarea
          v-model="draftNote"
          class="biss-textarea"
          rows="2"
          :placeholder="notePlaceholder"
        />
      </label>
      <div class="biss-key-result-form-actions">
        <BissButton variant="ghost" size="sm" :disabled="busy" @click="cancel">{{
          cancelLabel
        }}</BissButton>
        <BissButton type="submit" size="sm" :loading="busy">{{ saveLabel }}</BissButton>
      </div>
    </form>
  </article>
</template>
