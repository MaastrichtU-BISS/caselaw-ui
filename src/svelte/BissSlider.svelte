<script lang="ts">
  import { getContext } from 'svelte';
  import { Slider } from 'bits-ui';
  import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
  import { formatNumber } from '../core/number';
  let {
    value = $bindable(),
    label,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showValue = false,
    thumbLabels = ['Minimum', 'Maximum'],
    minStepsBetweenThumbs = 0,
    locale,
    format,
    name,
    onchange,
  }: {
    /** A number for one thumb, or a `[start, end]` pair for a range. */
    value?: number | number[];
    /** Visible name above the track; inside a BissField the field label names the slider. */
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Show the formatted value at the end of the label row. */
    showValue?: boolean;
    /** Names of the two thumbs of a range. */
    thumbLabels?: [string, string];
    /** Smallest gap between range thumbs, in steps. */
    minStepsBetweenThumbs?: number;
    locale?: string;
    format?: Intl.NumberFormatOptions;
    /** Submits the value with a surrounding form. */
    name?: string;
    onchange?: (value: number | number[]) => void;
  } = $props();
  const field = getContext<BissFieldContext | undefined>(BISS_FIELD);
  const uid = $props.id();
  let local = $state<number | number[] | undefined>(undefined);
  const current = $derived(value ?? local);
  const control = $derived(fieldControl(field, { disabled }));
  const range = $derived(Array.isArray(current));
  const values = $derived(Array.isArray(current) ? current : [current ?? min]);
  const labelId = $derived(field ? field.id + '-label' : uid + '-label');
  const show = (n: number) => formatNumber(n, { locale, options: format });
  const output = $derived(values.map(show).join(' – '));
  function update(next: number[]) {
    if (minStepsBetweenThumbs > 0 && next.length > 1) {
      const gap = (next[1] ?? 0) - (next[0] ?? 0);
      if (gap < minStepsBetweenThumbs * step) return;
    }
    const result = range ? [...next] : (next[0] ?? min);
    local = result;
    value = result;
    onchange?.(result);
  }
</script>

<div class="biss-slider" data-disabled={control.disabled || undefined}>
  {#if (label && !field) || showValue}<div class="biss-slider-head">
      {#if label && !field}<span id={labelId} class="biss-slider-label">{label}</span
        >{/if}{#if showValue}<output class="biss-slider-value" aria-hidden="true">{output}</output
        >{/if}
    </div>{/if}
  <Slider.Root
    class="biss-slider-root"
    type="multiple"
    bind:value={() => values, update}
    {min}
    {max}
    {step}
    disabled={control.disabled}
    ><span class="biss-slider-track"><Slider.Range class="biss-slider-range" /></span
    >{#each values as thumb, index (index)}<Slider.Thumb
        {index}
        class="biss-slider-thumb"
        id={index === 0 ? control.id : undefined}
        aria-label={label}
        aria-labelledby={range ? `${labelId} ${uid}-thumb-${index}` : labelId}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        aria-valuetext={show(thumb)}
      />{/each}</Slider.Root
  >
  {#if range}{#each thumbLabels as thumb, index (thumb)}<span
        id={`${uid}-thumb-${index}`}
        class="biss-visually-hidden">{thumb}</span
      >{/each}{/if}
  {#if name}{#each values as v, index (index)}<input type="hidden" {name} value={v} />{/each}{/if}
</div>
