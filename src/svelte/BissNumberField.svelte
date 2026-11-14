<script lang="ts">
  import { getContext } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import BissIcon from './BissIcon.svelte';
  import { BISS_FIELD, fieldControl, type BissFieldContext } from '../core/field';
  import { clampNumber, formatNumber, parseNumber, snapNumber, stepNumber } from '../core/number';
  let {
    value = $bindable(null),
    min,
    max,
    step = 1,
    largeStep,
    label,
    placeholder,
    disabled = false,
    required = false,
    invalid = false,
    locale,
    format,
    incrementLabel = 'Increase',
    decrementLabel = 'Decrease',
    size = 'md',
    name,
    class: className,
    onchange,
    ...rest
  }: Omit<
    HTMLInputAttributes,
    'value' | 'min' | 'max' | 'step' | 'size' | 'onchange' | 'type' | 'role'
  > & {
    value?: number | null;
    min?: number;
    max?: number;
    step?: number;
    /** Step for Page Up and Page Down; ten steps by default. */
    largeStep?: number;
    /** Accessible name when the field is not inside a labelled BissField. */
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    invalid?: boolean;
    locale?: string;
    /** Intl.NumberFormat options, for example `{ style: 'currency', currency: 'EUR' }`. */
    format?: Intl.NumberFormatOptions;
    incrementLabel?: string;
    decrementLabel?: string;
    size?: 'sm' | 'md';
    name?: string;
    onchange?: (value: number | null) => void;
  } = $props();
  const field = getContext<BissFieldContext | undefined>(BISS_FIELD);
  const control = $derived(
    fieldControl(field, {
      ...rest,
      'aria-invalid': invalid || undefined,
      required,
      disabled,
    }),
  );
  const options = $derived({ locale, options: format });
  let focused = $state(false);
  let draft = $state<string | null>(null);
  const text = $derived(focused && draft !== null ? draft : formatNumber(value, options));
  const atMin = $derived(min !== undefined && value !== null && value <= min);
  const atMax = $derived(max !== undefined && value !== null && value >= max);
  const valueNow = $derived(value === null ? undefined : clampNumber(value, min, max));
  const inputMode = $derived(
    Number.isInteger(step) && (min ?? -1) >= 0 && format?.style !== 'percent'
      ? 'numeric'
      : 'decimal',
  );
  function set(next: number | null) {
    draft = null;
    if (next === value) return;
    value = next;
    onchange?.(next);
  }
  function commit() {
    if (draft === null) return;
    if (!draft.trim()) return set(null);
    const parsed = parseNumber(draft, options);
    if (parsed === null) return set(value);
    set(snapNumber(parsed, step, min, max));
  }
  function move(direction: number, size = step) {
    if (control.disabled) return;
    const parsed = (draft !== null ? parseNumber(draft, options) : null) ?? value;
    set(stepNumber(parsed, direction, { step: size, grid: step, min, max }));
  }
  function keydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
    const large = largeStep ?? step * 10;
    const actions: Record<string, () => void> = {
      ArrowUp: () => move(1),
      ArrowDown: () => move(-1),
      PageUp: () => move(1, large),
      PageDown: () => move(-1, large),
      Home: () => min !== undefined && set(min),
      End: () => max !== undefined && set(max),
      Enter: commit,
    };
    const action = actions[event.key];
    if (!action) return;
    if (event.key !== 'Enter') event.preventDefault();
    action();
  }
</script>

<div
  class={['biss-number-field', className]}
  data-size={size}
  data-disabled={control.disabled || undefined}
  data-invalid={control['aria-invalid'] ? true : undefined}
>
  <input
    {...rest}
    id={control.id}
    class="biss-number-input"
    type="text"
    role="spinbutton"
    autocomplete="off"
    inputmode={inputMode}
    {name}
    {placeholder}
    value={text}
    disabled={control.disabled}
    required={control.required}
    aria-label={label}
    aria-describedby={control['aria-describedby']}
    aria-invalid={control['aria-invalid']}
    aria-valuenow={valueNow}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuetext={formatNumber(value, options) || undefined}
    onfocus={() => (focused = true)}
    onblur={() => {
      commit();
      focused = false;
    }}
    oninput={(event) => (draft = event.currentTarget.value)}
    onkeydown={keydown}
  />
  <span class="biss-number-steppers"
    ><button
      type="button"
      class="biss-number-step"
      tabindex="-1"
      aria-label={decrementLabel}
      aria-controls={control.id}
      disabled={control.disabled || atMin}
      onclick={() => move(-1)}><BissIcon name="minus" /></button
    ><button
      type="button"
      class="biss-number-step"
      tabindex="-1"
      aria-label={incrementLabel}
      aria-controls={control.id}
      disabled={control.disabled || atMax}
      onclick={() => move(1)}><BissIcon name="plus" /></button
    ></span
  >
</div>
