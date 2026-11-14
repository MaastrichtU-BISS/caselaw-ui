<script lang="ts">
  /**
   * Match the columns of an imported file to the fields they fill. Columns are
   * matched by name on first render; people change any match with a plain select,
   * and a field moves when it is chosen for another column. Required fields that
   * no column fills are listed above the submit action. The host owns the file,
   * the preview and the import itself.
   */
  import { onMount, untrack } from 'svelte';
  import BissButton from './BissButton.svelte';
  import BissIcon from './BissIcon.svelte';
  import {
    assignField,
    autoMatch,
    validateMapping,
    type BissImportColumn,
    type BissImportField,
    type BissImportMapping,
  } from '../core/import-mapping';
  import { fillLabel } from '../core/blocks';

  interface Props {
    columns: BissImportColumn[];
    fields: BissImportField[];
    /** Column to field; `null` leaves a column out. Bind to keep it in sync. */
    mapping?: BissImportMapping;
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
    onchange?: (mapping: BissImportMapping) => void;
    onsubmit?: (mapping: BissImportMapping) => void;
  }

  let {
    columns,
    fields,
    mapping = $bindable({}),
    autoMatchOnStart = true,
    steps,
    step,
    title = 'Match columns',
    description,
    busy = false,
    columnLabel = 'Column in file',
    samplesLabel = 'Sample values',
    fieldLabel = 'Imports to',
    skipLabel = 'Don’t import',
    autoMatchLabel = 'Auto-match',
    suggestedLabel = 'Suggested',
    requiredLabel = 'required',
    selectLabel = 'Field for {column}',
    missingLabel = 'Choose a column for {fields}.',
    conflictLabel = '{field} is chosen for {columns}.',
    summaryLabel = '{count} of {total} columns will be imported.',
    movedLabel = '{field} moved to {column}.',
    stepsLabel = 'Import steps',
    noSamplesLabel = 'No values',
    submitLabel = 'Continue',
    onchange,
    onsubmit,
  }: Props = $props();

  const uid = $props.id();
  let touched = $state(new Set<string>());
  /** Columns the host had already decided; the rest show as suggestions until changed. */
  let decided = $state(new Set(untrack(() => Object.keys(mapping))));
  let attempted = $state(false);
  let announcement = $state('');
  let summary = $state<HTMLElement | null>(null);

  const current = $derived<BissImportMapping>(
    autoMatchOnStart
      ? autoMatch(columns, fields, mapping)
      : Object.fromEntries(columns.map((c) => [c.key, mapping[c.key] ?? null])),
  );
  const result = $derived(validateMapping(current, fields, columns));
  const active = $derived(step ?? 1);
  const fieldName = (key: string) => fields.find((f) => f.key === key)?.label ?? key;
  const samples = (column: BissImportColumn) =>
    (column.samples ?? [])
      .filter((v) => v !== null && v !== '')
      .slice(0, 3)
      .map(String);
  const isSuggested = (column: string) =>
    !!current[column] && !touched.has(column) && !decided.has(column);
  const usedBy = (field: string, column: string) =>
    columns.find((c) => c.key !== column && current[c.key] === field)?.key;

  function commit(next: BissImportMapping) {
    mapping = next;
    onchange?.(next);
  }
  function choose(column: string, value: string) {
    const field = value || null;
    const previous = field ? usedBy(field, column) : undefined;
    touched = new Set([...touched, column]);
    commit(assignField(current, column, field));
    announcement = field && previous ? fillLabel(movedLabel, { field: fieldName(field), column }) : '';
  }
  /** Suggest again for every column nobody chose a field for; chosen fields stay. */
  function rematch() {
    const kept = Object.fromEntries(
      Object.entries(mapping).filter(
        ([column, field]) => field !== null && (touched.has(column) || decided.has(column)),
      ),
    );
    touched = new Set(Object.keys(kept));
    commit(autoMatch(columns, fields, kept));
  }
  function submit() {
    attempted = true;
    if (!result.valid) {
      summary?.focus();
      return;
    }
    onsubmit?.(current);
  }
  onMount(() => {
    if (!autoMatchOnStart) return;
    const next = current;
    if (columns.some((c) => (mapping[c.key] ?? null) !== next[c.key])) commit(next);
  });
</script>

<section class="biss-import-mapper" aria-labelledby={uid + '-title'} aria-busy={busy || undefined}>
  {#if steps?.length}
    <ol class="biss-import-steps" aria-label={stepsLabel}>
      {#each steps as name, index (name)}
        <li
          data-state={index + 1 < active ? 'done' : index + 1 === active ? 'current' : 'next'}
          aria-current={index + 1 === active ? 'step' : undefined}
        >
          <span aria-hidden="true"
            >{#if index + 1 < active}<BissIcon name="check" />{:else}{index + 1}{/if}</span
          >{name}
        </li>
      {/each}
    </ol>
  {/if}
  <header class="biss-import-head">
    <div class="biss-grow">
      <h2 id={uid + '-title'}>{title}</h2>
      {#if description}<p>{description}</p>{/if}
    </div>
    <BissButton variant="secondary" size="sm" disabled={busy} onclick={rematch}
      ><BissIcon name="spark" />{autoMatchLabel}</BissButton
    >
  </header>
  <div class="biss-import-table" role="table" aria-labelledby={uid + '-title'}>
    <div class="biss-import-row biss-import-row-head" role="row">
      <span role="columnheader">{columnLabel}</span>
      <span role="columnheader">{samplesLabel}</span>
      <span aria-hidden="true"></span>
      <span role="columnheader">{fieldLabel}</span>
    </div>
    {#each columns as column (column.key)}
      <div
        class="biss-import-row"
        role="row"
        data-skipped={!current[column.key] || undefined}
        data-conflict={result.conflicts.some((c) => c.columns.includes(column.key)) || undefined}
      >
        <span role="cell" class="biss-import-column">{column.key}</span>
        <span role="cell" class="biss-import-samples"
          >{samples(column).join(' · ') || noSamplesLabel}</span
        >
        <span class="biss-import-arrow" aria-hidden="true"><BissIcon name="chev" /></span>
        <span role="cell" class="biss-import-pick">
          <select
            class="biss-select"
            value={current[column.key] ?? ''}
            aria-label={fillLabel(selectLabel, { column: column.key })}
            disabled={busy}
            onchange={(e) => choose(column.key, e.currentTarget.value)}
          >
            <option value="">{skipLabel}</option>
            {#each fields as field (field.key)}
              {@const other = usedBy(field.key, column.key)}
              <option value={field.key}
                >{field.label}{field.required ? ` (${requiredLabel})` : ''}{other
                  ? ` · ${other}`
                  : ''}</option
              >
            {/each}
          </select>
          {#if isSuggested(column.key)}<span class="biss-import-tag">{suggestedLabel}</span>{/if}
        </span>
      </div>
    {/each}
  </div>
  <footer class="biss-import-foot">
    <div
      bind:this={summary}
      class="biss-import-summary"
      tabindex="-1"
      role={attempted && !result.valid ? 'alert' : 'status'}
      data-invalid={!result.valid || undefined}
    >
      {#if result.missing.length}
        <p>
          <BissIcon name="alert" />{fillLabel(missingLabel, {
            fields: result.missing.map((f) => f.label).join(', '),
          })}
        </p>
      {/if}
      {#each result.conflicts as conflict (conflict.field.key)}
        <p>
          <BissIcon name="alert" />{fillLabel(conflictLabel, {
            field: conflict.field.label,
            columns: conflict.columns.join(', '),
          })}
        </p>
      {/each}
      {#if result.valid}
        <p>
          <BissIcon name="check" />{fillLabel(summaryLabel, {
            count: result.mapped,
            total: columns.length,
          })}
        </p>
      {/if}
    </div>
    <BissButton loading={busy} onclick={submit}>{submitLabel}</BissButton>
  </footer>
  <p class="biss-visually-hidden" aria-live="polite">{announcement}</p>
</section>
