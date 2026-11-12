<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  let {
    value = $bindable(''),
    label,
    placeholder = 'Add text…',
    readonly = false,
    multiline = false,
    onchange,
  }: {
    value?: string;
    label: string;
    placeholder?: string;
    readonly?: boolean;
    multiline?: boolean;
    onchange?: (value: string) => void;
  } = $props();
  type Events = { change: [value: string] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  let editing = $state(false);
  let draft = $state('');
  let input: HTMLInputElement | HTMLTextAreaElement | null = $state(null);
  function save() {
    if (!editing) return;
    editing = false;
    if (draft !== value) {
      value = draft;
      emit('change', value);
    }
  }
</script>

<span class="biss-editable"
  >{#if editing && !readonly}{#if multiline}<textarea
        bind:this={input}
        bind:value={draft}
        aria-label={label}
        onblur={save}
        onkeydown={(e) => {
          if (e.key === 'Escape') {
            editing = false;
            draft = value;
          }
        }}></textarea>{:else}<input
        bind:this={input}
        bind:value={draft}
        aria-label={label}
        onblur={save}
        onkeydown={(e) => {
          if (e.key === 'Enter') save();
          else if (e.key === 'Escape') {
            editing = false;
            draft = value;
          }
        }}
      />{/if}{:else}<button
      type="button"
      disabled={readonly}
      aria-label={label}
      onclick={async () => {
        draft = value;
        editing = true;
        await tick();
        input?.focus();
      }}>{value || placeholder}</button
    >{/if}</span
>
