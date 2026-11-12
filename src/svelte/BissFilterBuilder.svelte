<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import BissSelectPicker from './BissSelectPicker.svelte';
  import BissSegmentedControl from './BissSegmentedControl.svelte';
  import type { BissFilterField, BissFilterRule } from '../core/types';
  let {
    fields,
    rules = [],
    match = 'all',
    label = 'Filters',
    addLabel = 'Add filter',
    removeLabel = 'Remove filter',
    allLabel = 'Match all',
    anyLabel = 'Match any',
    onchange,
    onmatch,
  }: {
    fields: BissFilterField[];
    rules?: BissFilterRule[];
    match?: 'all' | 'any';
    label?: string;
    addLabel?: string;
    removeLabel?: string;
    allLabel?: string;
    anyLabel?: string;
    onchange?: (rules: BissFilterRule[]) => void;
    onmatch?: (value: 'all' | 'any') => void;
  } = $props();
  type Events = { change: [rules: BissFilterRule[]]; match: [value: 'all' | 'any'] };
  const handlers = {
    get change() {
      return onchange;
    },
    get match() {
      return onmatch;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  const uid = $props.id();
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

<section class="biss-filter-builder" aria-label={label}>
  <header>
    <h3>{label}</h3>
    <BissSegmentedControl
      options={[
        { value: 'all', label: allLabel },
        { value: 'any', label: anyLabel },
      ]}
      value={match}
      {label}
      onchange={(v) => emit('match', v as 'all' | 'any')}
    />
  </header>
  {#each rules as rule (rule.id)}<div class="biss-filter-row">
      <BissSelectPicker
        label="Field"
        value={rule.field}
        options={fields.map((f) => ({ value: f.key, label: f.label }))}
        onchange={(v) =>
          patch(rule.id, {
            field: v,
            operator: fields.find((f) => f.key === v)?.operators[0]?.value ?? '',
          })}
      /><BissSelectPicker
        label="Operator"
        value={rule.operator}
        options={fields.find((f) => f.key === rule.field)?.operators ?? []}
        onchange={(v) => patch(rule.id, { operator: v })}
      /><input
        class="biss-input"
        value={rule.value}
        aria-label="Filter value"
        oninput={(e) => patch(rule.id, { value: e.currentTarget.value })}
      /><button
        type="button"
        class="biss-header-action"
        aria-label={removeLabel}
        onclick={() =>
          emit(
            'change',
            rules.filter((r) => r.id !== rule.id),
          )}><BissIcon name="x" /></button
      >
    </div>{/each}<button
    class="biss-text-button"
    type="button"
    disabled={!fields.length}
    onclick={add}>{addLabel}</button
  >
</section>
