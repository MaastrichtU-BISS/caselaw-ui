<script setup lang="ts">
/**
 * Collect product feedback in a focused dialog: an optional rating, a kind of
 * feedback, a message and optional context and reply address. The host sends it:
 * `submit` carries the payload, `sending` keeps the dialog open with progress,
 * `sent` shows the thank-you state and `error` reports a failure inline.
 */
import { computed, ref, useId, watch } from 'vue';
import BissDialog from './BissDialog.vue';
import BissButton from './BissButton.vue';
import BissIcon from './BissIcon.vue';
import type { BissPickOption } from '../core/types';
import type { BissFeedbackPayload } from '../core/templates';
import { fillLabel } from '../core/blocks';

const props = withDefaults(
  defineProps<{
    /** Rating choices, worst first. Pass an empty list to hide the rating. */
    ratings?: BissPickOption[];
    /** Kinds of feedback. Pass an empty list to hide them. */
    categories?: BissPickOption[];
    /** Describes the context that may be included, e.g. the page and browser. Hidden when empty. */
    context?: string;
    /** Ask for an optional reply address. */
    askEmail?: boolean;
    /** Shortest accepted message, in characters. */
    minLength?: number;
    sending?: boolean;
    sent?: boolean;
    error?: string;
    title?: string;
    description?: string;
    ratingLabel?: string;
    ratingLowLabel?: string;
    ratingHighLabel?: string;
    categoryLabel?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    /** Shown when the message is empty. */
    requiredLabel?: string;
    /** Shown when the message is too short. `{min}` is replaced. */
    tooShortLabel?: string;
    contextLabel?: string;
    emailLabel?: string;
    submitLabel?: string;
    cancelLabel?: string;
    closeLabel?: string;
    sentTitle?: string;
    sentCopy?: string;
    shortcutLabel?: string;
  }>(),
  {
    ratings: () => [
      { value: '1', label: 'Very poor' },
      { value: '2', label: 'Poor' },
      { value: '3', label: 'Okay' },
      { value: '4', label: 'Good' },
      { value: '5', label: 'Great' },
    ],
    categories: () => [
      { value: 'idea', label: 'Idea' },
      { value: 'problem', label: 'Problem' },
      { value: 'question', label: 'Question' },
      { value: 'praise', label: 'Praise' },
    ],
    askEmail: false,
    minLength: 10,
    sending: false,
    sent: false,
    title: 'Send feedback',
    description: 'Tell us what works and what gets in the way. We read every message.',
    ratingLabel: 'How is it going?',
    ratingLowLabel: 'Very poor',
    ratingHighLabel: 'Great',
    categoryLabel: 'Kind of feedback',
    messageLabel: 'Your feedback',
    messagePlaceholder: 'What happened, and what did you expect?',
    requiredLabel: 'Describe your feedback before sending.',
    tooShortLabel: 'Write at least {min} characters.',
    contextLabel: 'Include page and browser details',
    emailLabel: 'Email for a reply (optional)',
    submitLabel: 'Send feedback',
    cancelLabel: 'Cancel',
    closeLabel: 'Close',
    sentTitle: 'Thanks for your feedback',
    sentCopy: 'It reaches the team straight away. We reply when we need more detail.',
    shortcutLabel: 'to send',
  },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ submit: [feedback: BissFeedbackPayload]; close: [] }>();

const uid = useId();
const rating = ref<string | null>(null);
const category = ref<string | null>(props.categories[0]?.value ?? null);
const message = defineModel<string>('message', { default: '' });
const includeContext = ref(true);
const email = ref('');
const touched = ref(false);
let reset = false;

const problem = computed(() => {
  const length = message.value.trim().length;
  if (!length) return props.requiredLabel;
  if (length < props.minLength) return fillLabel(props.tooShortLabel, { min: props.minLength });
  return '';
});
const showProblem = computed(() => touched.value && !!problem.value);

watch(
  () => props.sent,
  (sent) => {
    if (sent) reset = true;
  },
);
watch(open, (value) => {
  if (value && reset) {
    reset = false;
    rating.value = null;
    category.value = props.categories[0]?.value ?? null;
    message.value = '';
    includeContext.value = true;
    email.value = '';
    touched.value = false;
  }
});

function submit() {
  touched.value = true;
  if (problem.value || props.sending) {
    if (problem.value) document.getElementById(uid + '-message')?.focus();
    return;
  }
  emit('submit', {
    rating: rating.value,
    category: category.value,
    message: message.value.trim(),
    includeContext: !!props.context && includeContext.value,
    email: email.value.trim(),
  });
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    submit();
  }
}
function close() {
  open.value = false;
}
</script>

<template>
  <BissDialog
    :open="open"
    :title="sent ? sentTitle : title"
    :description="sent ? sentCopy : description"
    :busy="sending"
    :close-label="closeLabel"
    @update:open="open = $event"
    @close="emit('close')"
  >
    <div v-if="sent" class="biss-feedback-sent" role="status">
      <span class="biss-feedback-sent-icon"><BissIcon name="check" /></span>
    </div>
    <form
      v-else
      :id="uid + '-form'"
      class="biss-feedback-form"
      novalidate
      @submit.prevent="submit"
    >
      <fieldset v-if="ratings.length" class="biss-feedback-rating">
        <legend>{{ ratingLabel }}</legend>
        <div class="biss-feedback-scale">
          <label v-for="(r, i) in ratings" :key="r.value" :title="r.label"
            ><input
              v-model="rating"
              type="radio"
              :name="uid + '-rating'"
              :value="r.value"
              :aria-label="r.label"
            /><span aria-hidden="true">{{ i + 1 }}</span></label
          >
        </div>
        <div class="biss-feedback-scale-ends" aria-hidden="true">
          <span>{{ ratingLowLabel }}</span><span>{{ ratingHighLabel }}</span>
        </div>
      </fieldset>
      <fieldset v-if="categories.length" class="biss-feedback-kinds">
        <legend class="biss-visually-hidden">{{ categoryLabel }}</legend>
        <label v-for="c in categories" :key="c.value"
          ><input v-model="category" type="radio" :name="uid + '-kind'" :value="c.value" /><span>{{
            c.label
          }}</span></label
        >
      </fieldset>
      <div class="biss-feedback-field">
        <label :for="uid + '-message'">{{ messageLabel }}</label>
        <textarea
          :id="uid + '-message'"
          v-model="message"
          class="biss-textarea"
          rows="5"
          maxlength="4000"
          required
          data-biss-autofocus
          :placeholder="messagePlaceholder"
          :aria-invalid="showProblem || undefined"
          :aria-describedby="showProblem ? uid + '-problem' : undefined"
          @blur="touched = touched || !!message"
          @keydown="onKey"
        />
        <p v-if="showProblem" :id="uid + '-problem'" class="biss-feedback-problem">
          {{ problem }}
        </p>
      </div>
      <label v-if="context" class="biss-checkbox biss-feedback-context"
        ><input v-model="includeContext" type="checkbox" /><span
          >{{ contextLabel }}<small>{{ context }}</small></span
        ></label
      >
      <div v-if="askEmail" class="biss-feedback-field">
        <label :for="uid + '-email'">{{ emailLabel }}</label>
        <input
          :id="uid + '-email'"
          v-model="email"
          class="biss-input"
          type="email"
          autocomplete="email"
        />
      </div>
      <p v-if="error" class="biss-feedback-error" role="alert">
        <BissIcon name="alert" />{{ error }}
      </p>
    </form>
    <template #actions>
      <template v-if="sent">
        <BissButton @click="close">{{ closeLabel }}</BissButton>
      </template>
      <template v-else>
        <span class="biss-feedback-shortcut" aria-hidden="true"
          ><kbd>Ctrl</kbd><kbd>↵</kbd> {{ shortcutLabel }}</span
        >
        <BissButton variant="ghost" :disabled="sending" @click="close">{{ cancelLabel }}</BissButton>
        <BissButton type="submit" :form="uid + '-form'" :loading="sending">{{
          submitLabel
        }}</BissButton>
      </template>
    </template>
  </BissDialog>
</template>
