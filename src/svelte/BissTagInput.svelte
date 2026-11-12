<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  let {
    modelValue = $bindable<string[]>([]),
    placeholder = 'Add label',
    disabled = false,
    suggestions = [],
    allowSpaces = false,
    removeLabel = 'Remove',
    onchange,
  }: {
    modelValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    suggestions?: string[];
    allowSpaces?: boolean;
    removeLabel?: string;
    onchange?: (value: string[]) => void;
  } = $props();
  let draft = $state('');
  function set(value: string[]) {
    modelValue = value;
    onchange?.(value);
  }
  function commit() {
    if (disabled) return;
    const words = draft
      .split(allowSpaces ? /[,\n]/ : /[\s,\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    set([...new Set([...modelValue, ...words])]);
    draft = '';
  }
</script>

<div>
  <div class="biss-tag-input">
    {#each modelValue as tag}<span class="biss-tag"
        >{tag}{#if !disabled}<button
            type="button"
            class="biss-tag-remove"
            aria-label={removeLabel + ' ' + tag}
            onclick={() => set(modelValue.filter((v) => v !== tag))}><BissIcon name="x" /></button
          >{/if}</span
      >{/each}<input
      class="biss-tag-input-field"
      {disabled}
      aria-label={placeholder}
      placeholder={modelValue.length ? '' : placeholder}
      bind:value={draft}
      onblur={commit}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ',' || (!allowSpaces && e.key === ' ')) {
          e.preventDefault();
          commit();
        } else if (e.key === 'Backspace' && !draft) set(modelValue.slice(0, -1));
      }}
    />
  </div>
  {#if !disabled}<div class="biss-tag-suggestions">
      {#each suggestions.filter((s) => !modelValue.includes(s)) as suggestion}<button
          type="button"
          class="biss-tag-suggestion"
          onclick={() => set([...modelValue, suggestion])}>{suggestion}</button
        >{/each}
    </div>{/if}
</div>
