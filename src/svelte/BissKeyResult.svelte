<script lang="ts">
  /**
   * One key result: where it started, where it is, where it should end, how far
   * along that is and how confident the owner is. “Check in” opens an inline form
   * for the new value, confidence and a note; submitting calls `oncheckin`. The host
   * stores the check-in and passes the new values back.
   */
  import { tick, untrack } from 'svelte';
  import BissButton from './BissButton.svelte';
  import BissGoalBar from './BissGoalBar.svelte';
  import BissIcon from './BissIcon.svelte';
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

  interface Props {
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
    /** The check-in form is open. Bind to control it. */
    open?: boolean;
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
    oncheckin?: (value: BissKeyResultCheckin) => void;
    oncancel?: () => void;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    title,
    owner,
    start,
    current,
    target,
    format = 'number',
    unit,
    currency = 'EUR',
    locale,
    formatValue,
    expected,
    confidence,
    lastCheckin,
    canCheckIn = true,
    open = $bindable(false),
    busy = false,
    level = 3,
    confidenceLabels = { 'on-track': 'On track', 'at-risk': 'At risk', 'off-track': 'Off track' },
    progressLabel = 'Progress of {title}',
    ownerLabel = 'Owner',
    startLabel = 'Start',
    targetLabel = 'Target',
    checkInLabel = 'Check in',
    formTitle = 'New check-in',
    valueLabel = 'Current value',
    confidenceLabel = 'Confidence',
    noteLabel = 'Note',
    notePlaceholder = 'What changed since the last check-in?',
    saveLabel = 'Save check-in',
    cancelLabel = 'Cancel',
    invalidLabel = 'Enter a number, for example 12 or 12.5.',
    noCheckinLabel = 'No check-ins yet',
    lastCheckinLabel = '{time} by {author}',
    oncheckin,
    oncancel,
    onOpenChange,
  }: Props = $props();

  const uid = $props.id();
  const levels: BissConfidence[] = ['on-track', 'at-risk', 'off-track'];
  let valueInput = $state<HTMLInputElement | null>(null);
  let toggle = $state<HTMLElement | null>(null);
  let draftValue = $state('');
  let draftConfidence = $state<BissConfidence>('on-track');
  let draftNote = $state('');
  let invalid = $state(false);

  const progress = $derived(keyResultProgress(start, current, target));
  const percent = $derived(progress === null ? '–' : Math.round(progress * 100) + '%');
  const tone = $derived(
    confidence === 'off-track'
      ? 'danger'
      : confidence === 'at-risk'
        ? 'warning'
        : confidence === 'on-track'
          ? 'success'
          : 'primary',
  );
  const show = (value: number) =>
    formatValue ? formatValue(value) : formatKeyResultValue(value, { format, unit, currency, locale });
  const lastLine = $derived(
    lastCheckin
      ? lastCheckin.author
        ? fillLabel(lastCheckinLabel, { time: lastCheckin.time, author: lastCheckin.author })
        : lastCheckin.time
      : '',
  );

  function setOpen(value: boolean) {
    open = value;
    onOpenChange?.(value);
  }
  function begin() {
    setOpen(true);
  }
  // Fill the form from the current values whenever it opens, also when the host opens it.
  let wasOpen = false;
  $effect(() => {
    if (open && !wasOpen) {
      draftValue = String(untrack(() => current));
      draftConfidence = untrack(() => confidence) ?? 'on-track';
      draftNote = '';
      invalid = false;
      tick().then(() => valueInput?.select());
    }
    wasOpen = open;
  });
  async function cancel() {
    setOpen(false);
    oncancel?.();
    await tick();
    toggle?.focus();
  }
  function submit(event: SubmitEvent) {
    event.preventDefault();
    const value = parseKeyResultValue(draftValue);
    invalid = value === null;
    if (value === null) {
      valueInput?.focus();
      return;
    }
    oncheckin?.({ value, confidence: draftConfidence, note: draftNote.trim() });
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      cancel();
    }
  }
</script>

<article class="biss-key-result" data-open={open || undefined} aria-labelledby={uid + '-title'}>
  <div class="biss-key-result-row">
    <div class="biss-key-result-name">
      <svelte:element this={`h${level}`} id={uid + '-title'}>{title}</svelte:element>
      {#if owner}<small
          ><span class="biss-visually-hidden">{ownerLabel}: </span><BissIcon name="user" />{owner}</small
        >{/if}
    </div>
    <div class="biss-key-result-metric">
      <p><strong>{show(current)}</strong><span>/ {show(target)}</span><em>{percent}</em></p>
      <BissGoalBar
        value={progress}
        {expected}
        {tone}
        height={6}
        label={fillLabel(progressLabel, { title })}
      />
      <small>{startLabel} {show(start)} · {targetLabel} {show(target)}</small>
    </div>
    <div class="biss-key-result-confidence">
      {#if confidence}<span class="biss-key-result-pill" data-confidence={confidence}
          ><i aria-hidden="true"></i>{confidenceLabels[confidence]}</span
        >{/if}
      <small title={lastCheckin?.note}>{lastLine || noCheckinLabel}</small>
    </div>
    <div class="biss-key-result-actions">
      {#if canCheckIn}
        <button
          bind:this={toggle}
          type="button"
          class="biss-button biss-button-secondary biss-button-sm"
          aria-expanded={open}
          aria-controls={uid + '-form'}
          onclick={() => (open ? cancel() : begin())}
          ><span class="biss-button-label">{checkInLabel}</span></button
        >
      {/if}
    </div>
  </div>
  {#if lastCheckin?.note && !open}<p class="biss-key-result-note">“{lastCheckin.note}”</p>{/if}
  {#if open}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <form
      id={uid + '-form'}
      class="biss-key-result-form"
      aria-label={formTitle}
      onsubmit={submit}
      onkeydown={keydown}
    >
      <div class="biss-key-result-fields">
        <label class="biss-key-result-field">
          <span>{valueLabel}</span>
          <input
            bind:this={valueInput}
            bind:value={draftValue}
            class="biss-input"
            inputmode="decimal"
            autocomplete="off"
            aria-invalid={invalid || undefined}
            aria-describedby={uid + '-value-help'}
          />
          <small id={uid + '-value-help'} data-invalid={invalid || undefined}
            >{invalid ? invalidLabel : `${startLabel} ${show(start)} · ${targetLabel} ${show(target)}`}</small
          >
        </label>
        <fieldset class="biss-key-result-field">
          <legend>{confidenceLabel}</legend>
          <div class="biss-key-result-choices">
            {#each levels as choice (choice)}
              <label data-confidence={choice}>
                <input type="radio" name={uid + '-confidence'} value={choice} bind:group={draftConfidence} />
                <i aria-hidden="true"></i>{confidenceLabels[choice]}
              </label>
            {/each}
          </div>
        </fieldset>
      </div>
      <label class="biss-key-result-field">
        <span>{noteLabel}</span>
        <textarea bind:value={draftNote} class="biss-textarea" rows="2" placeholder={notePlaceholder}
        ></textarea>
      </label>
      <div class="biss-key-result-form-actions">
        <BissButton variant="ghost" size="sm" disabled={busy} onclick={cancel}>{cancelLabel}</BissButton>
        <BissButton type="submit" size="sm" loading={busy}>{saveLabel}</BissButton>
      </div>
    </form>
  {/if}
</article>
