<script lang="ts">
  import type { BissProgressTone } from '../core/types';
  let {
    value = null,
    max = 100,
    label,
    showLabel = false,
    showValue = false,
    valueText,
    tone = 'primary',
    size = 'md',
    locale,
  }: {
    /** Current value; `null` shows an indeterminate bar while the amount is unknown. */
    value?: number | null;
    max?: number;
    /** Accessible name, shown above the bar when `showLabel` is set. */
    label: string;
    showLabel?: boolean;
    /** Show the formatted value beside the label. */
    showValue?: boolean;
    /** Replaces the formatted percentage, for example "3 of 8 files". */
    valueText?: string;
    tone?: BissProgressTone;
    size?: 'sm' | 'md';
    locale?: string;
  } = $props();
  const id = $props.id();
  const indeterminate = $derived(value === null || !Number.isFinite(value));
  const ratio = $derived(
    indeterminate || !(max > 0) ? 0 : Math.min(1, Math.max(0, (value as number) / max)),
  );
  const text = $derived(
    indeterminate
      ? valueText
      : (valueText ?? new Intl.NumberFormat(locale, { style: 'percent' }).format(ratio)),
  );
</script>

<div
  class="biss-progress"
  data-tone={tone}
  data-size={size}
  data-indeterminate={indeterminate || undefined}
>
  {#if showLabel || (showValue && text)}<div class="biss-progress-head">
      {#if showLabel}<span {id} class="biss-progress-label">{label}</span
        >{/if}{#if showValue && text}<span class="biss-progress-value" aria-hidden="true"
          >{text}</span
        >{/if}
    </div>{/if}
  <div
    class="biss-progress-track"
    role="progressbar"
    aria-labelledby={showLabel ? id : undefined}
    aria-label={showLabel ? undefined : label}
    aria-valuemin={0}
    aria-valuemax={max}
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuetext={text}
  >
    <span class="biss-progress-bar" style:width={indeterminate ? undefined : ratio * 100 + '%'}
    ></span>
  </div>
</div>
