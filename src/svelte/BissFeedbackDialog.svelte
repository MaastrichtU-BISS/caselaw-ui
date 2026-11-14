<script lang="ts">
  /**
   * Collect product feedback in a focused dialog: an optional rating, a kind of
   * feedback, a message and optional context and reply address. The host sends it:
   * `onsubmit` receives the payload, `sending` keeps the dialog open with progress,
   * `sent` shows the thank-you state and `error` reports a failure inline.
   */
  import { untrack } from 'svelte';
  import BissDialog from './BissDialog.svelte';
  import BissButton from './BissButton.svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissPickOption } from '../core/types';
  import type { BissFeedbackPayload } from '../core/templates';
  import { fillLabel } from '../core/blocks';

  interface Props {
    open?: boolean;
    /** The message draft. Bind it to keep a draft when the dialog closes. */
    message?: string;
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
    onsubmit?: (feedback: BissFeedbackPayload) => void;
    onclose?: () => void;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    open = $bindable(false),
    message = $bindable(''),
    ratings = [
      { value: '1', label: 'Very poor' },
      { value: '2', label: 'Poor' },
      { value: '3', label: 'Okay' },
      { value: '4', label: 'Good' },
      { value: '5', label: 'Great' },
    ],
    categories = [
      { value: 'idea', label: 'Idea' },
      { value: 'problem', label: 'Problem' },
      { value: 'question', label: 'Question' },
      { value: 'praise', label: 'Praise' },
    ],
    context,
    askEmail = false,
    minLength = 10,
    sending = false,
    sent = false,
    error,
    title = 'Send feedback',
    description = 'Tell us what works and what gets in the way. We read every message.',
    ratingLabel = 'How is it going?',
    ratingLowLabel = 'Very poor',
    ratingHighLabel = 'Great',
    categoryLabel = 'Kind of feedback',
    messageLabel = 'Your feedback',
    messagePlaceholder = 'What happened, and what did you expect?',
    requiredLabel = 'Describe your feedback before sending.',
    tooShortLabel = 'Write at least {min} characters.',
    contextLabel = 'Include page and browser details',
    emailLabel = 'Email for a reply (optional)',
    submitLabel = 'Send feedback',
    cancelLabel = 'Cancel',
    closeLabel = 'Close',
    sentTitle = 'Thanks for your feedback',
    sentCopy = 'It reaches the team straight away. We reply when we need more detail.',
    shortcutLabel = 'to send',
    onsubmit,
    onclose,
    onOpenChange,
  }: Props = $props();

  const uid = $props.id();
  let rating = $state<string | null>(null);
  let category = $state<string | null>(untrack(() => categories[0]?.value ?? null));
  let includeContext = $state(true);
  let email = $state('');
  let touched = $state(false);
  let reset = false;

  const problem = $derived.by(() => {
    const length = message.trim().length;
    if (!length) return requiredLabel;
    if (length < minLength) return fillLabel(tooShortLabel, { min: minLength });
    return '';
  });
  const showProblem = $derived(touched && !!problem);

  $effect(() => {
    if (sent) reset = true;
  });
  $effect.pre(() => {
    if (open && reset) {
      reset = false;
      rating = null;
      category = categories[0]?.value ?? null;
      message = '';
      includeContext = true;
      email = '';
      touched = false;
    }
  });

  function submit(event?: Event) {
    event?.preventDefault();
    touched = true;
    if (problem || sending) {
      if (problem) document.getElementById(uid + '-message')?.focus();
      return;
    }
    onsubmit?.({
      rating,
      category,
      message: message.trim(),
      includeContext: !!context && includeContext,
      email: email.trim(),
    });
  }
  function onKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      submit();
    }
  }
  function setOpen(value: boolean) {
    open = value;
    onOpenChange?.(value);
  }
</script>

{#snippet actions()}
  {#if sent}
    <BissButton onclick={() => setOpen(false)}>{closeLabel}</BissButton>
  {:else}
    <span class="biss-feedback-shortcut" aria-hidden="true"
      ><kbd>Ctrl</kbd><kbd>↵</kbd> {shortcutLabel}</span
    >
    <BissButton variant="ghost" disabled={sending} onclick={() => setOpen(false)}
      >{cancelLabel}</BissButton
    >
    <BissButton type="submit" form={uid + '-form'} loading={sending}>{submitLabel}</BissButton>
  {/if}
{/snippet}

<BissDialog
  {open}
  title={sent ? sentTitle : title}
  description={sent ? sentCopy : description}
  busy={sending}
  {closeLabel}
  onOpenChange={setOpen}
  onclose={() => onclose?.()}
  {actions}
>
  {#if sent}
    <div class="biss-feedback-sent" role="status">
      <span class="biss-feedback-sent-icon"><BissIcon name="check" /></span>
    </div>
  {:else}
    <form
      id={uid + '-form'}
      class="biss-feedback-form"
      novalidate
      onsubmit={submit}
    >
      {#if ratings.length}
        <fieldset class="biss-feedback-rating">
          <legend>{ratingLabel}</legend>
          <div class="biss-feedback-scale">
            {#each ratings as r, i (r.value)}<label title={r.label}
                ><input
                  bind:group={rating}
                  type="radio"
                  name={uid + '-rating'}
                  value={r.value}
                  aria-label={r.label}
                /><span aria-hidden="true">{i + 1}</span></label
              >{/each}
          </div>
          <div class="biss-feedback-scale-ends" aria-hidden="true">
            <span>{ratingLowLabel}</span><span>{ratingHighLabel}</span>
          </div>
        </fieldset>
      {/if}
      {#if categories.length}
        <fieldset class="biss-feedback-kinds">
          <legend class="biss-visually-hidden">{categoryLabel}</legend>
          {#each categories as c (c.value)}<label
              ><input
                bind:group={category}
                type="radio"
                name={uid + '-kind'}
                value={c.value}
              /><span>{c.label}</span></label
            >{/each}
        </fieldset>
      {/if}
      <div class="biss-feedback-field">
        <label for={uid + '-message'}>{messageLabel}</label>
        <textarea
          id={uid + '-message'}
          bind:value={message}
          class="biss-textarea"
          rows="5"
          maxlength="4000"
          required
          data-biss-autofocus
          placeholder={messagePlaceholder}
          aria-invalid={showProblem || undefined}
          aria-describedby={showProblem ? uid + '-problem' : undefined}
          onblur={() => (touched = touched || !!message)}
          onkeydown={onKey}
        ></textarea>
        {#if showProblem}<p id={uid + '-problem'} class="biss-feedback-problem">{problem}</p>{/if}
      </div>
      {#if context}
        <label class="biss-checkbox biss-feedback-context"
          ><input bind:checked={includeContext} type="checkbox" /><span
            >{contextLabel}<small>{context}</small></span
          ></label
        >
      {/if}
      {#if askEmail}
        <div class="biss-feedback-field">
          <label for={uid + '-email'}>{emailLabel}</label>
          <input
            id={uid + '-email'}
            bind:value={email}
            class="biss-input"
            type="email"
            autocomplete="email"
          />
        </div>
      {/if}
      {#if error}<p class="biss-feedback-error" role="alert"><BissIcon name="alert" />{error}</p>{/if}
    </form>
  {/if}
</BissDialog>
