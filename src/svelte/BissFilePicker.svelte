<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    label = 'Add files',
    hint = 'Choose files or drop them here.',
    accept = '',
    multiple = true,
    disabled = false,
    onpick,
  }: {
    label?: string;
    hint?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onpick?: (files: File[]) => void;
  } = $props();
  type Events = { pick: [files: File[]] };
  const handlers = {
    get pick() {
      return onpick;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<label
  class="biss-file-picker"
  data-disabled={disabled}
  ondragover={(e) => e.preventDefault()}
  ondrop={(e) => {
    e.preventDefault();
    if (!disabled) emit('pick', Array.from(e.dataTransfer?.files ?? []));
  }}
  ><BissIcon name="up" /><b>{label}</b><span>{hint}</span><input
    type="file"
    {accept}
    {multiple}
    {disabled}
    aria-label={label}
    onchange={(e) => emit('pick', Array.from(e.currentTarget.files ?? []))}
  /></label
>
