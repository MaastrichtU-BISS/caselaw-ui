<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import BissSwatchPicker from './BissSwatchPicker.svelte';
  import BissEditableText from './BissEditableText.svelte';
  import { bissSwatches, type BissLabel } from '../core/types';
  import { moveItem, validateLabel, uniqueLabel } from '../core/collections';
  let {
    colorLabel = 'Color: {label}',
    nameLabel = 'Name: {label}',
    requiredLabel = 'Enter a label name.',
    duplicateLabel = 'Choose a unique label name.',

    items,
    label = 'Edit labels',
    addLabel = 'Add label',
    newLabel = 'New label',
    removeLabel = 'Remove',
    upLabel = 'Move up',
    downLabel = 'Move down',
    onchange,
  }: {
    colorLabel?: string;
    nameLabel?: string;
    requiredLabel?: string;
    duplicateLabel?: string;

    items: BissLabel[];
    label?: string;
    addLabel?: string;
    newLabel?: string;
    removeLabel?: string;
    upLabel?: string;
    downLabel?: string;
    onchange?: (items: BissLabel[]) => void;
  } = $props();
  type Events = { change: [items: BissLabel[]] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  const uid = $props.id();
  let sequence = 0;
  let error = $state('');
  const colors = bissSwatches.map((c) => ({ ...c, value: c.color }));
  function rename(id: string, name: string) {
    const result = validateLabel(items, id, name);
    error =
      result.error === 'required'
        ? requiredLabel
        : result.error === 'duplicate'
          ? duplicateLabel
          : '';
    if (result.items) emit('change', result.items);
  }
  function add() {
    emit('change', [
      ...items,
      {
        id: uid + '-' + sequence++,
        label: uniqueLabel(items, newLabel),
        color: colors[items.length % colors.length]!.color,
      },
    ]);
  }
</script>

<section class="biss-label-editor" aria-label={label}>
  <h3>{label}</h3>
  {#each items as item, i (item.id)}<div class="biss-editor-row">
      <BissSwatchPicker
        label={colorLabel.replace('{label}', item.label)}
        value={item.color}
        {colors}
        onchange={(color) =>
          emit(
            'change',
            items.map((v) => (v.id === item.id ? { ...v, color } : v)),
          )}
      /><BissEditableText
        label={nameLabel.replace('{label}', item.label)}
        value={item.label}
        readonly={item.locked}
        onchange={(value) => rename(item.id, value)}
      />{#if item.count !== undefined}<small>{item.count}</small>{/if}<button
        type="button"
        class="biss-header-action"
        aria-label={upLabel + ' ' + item.label}
        disabled={i === 0}
        onclick={() => emit('change', moveItem(items, i, -1))}><BissIcon name="arrowUp" /></button
      ><button
        type="button"
        class="biss-header-action"
        aria-label={downLabel + ' ' + item.label}
        disabled={i === items.length - 1}
        onclick={() => emit('change', moveItem(items, i, 1))}><BissIcon name="arrowDown" /></button
      ><button
        type="button"
        class="biss-header-action"
        aria-label={removeLabel + ' ' + item.label}
        disabled={item.locked || !!item.count}
        onclick={() =>
          emit(
            'change',
            items.filter((v) => v.id !== item.id),
          )}><BissIcon name="x" /></button
      >
    </div>{/each}{#if error}<p class="biss-field-error" role="alert">{error}</p>{/if}<button
    type="button"
    class="biss-text-button"
    onclick={add}>{addLabel}</button
  >
</section>
