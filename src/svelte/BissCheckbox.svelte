<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    checked = $bindable(false),
    label,
    description = undefined,
    disabled = false,
    onchange,
  }: {
    checked?: boolean;
    label: string;
    description?: string | undefined;
    disabled?: boolean;
    onchange?: (value: boolean) => void;
  } = $props();
  type Events = { change: [value: boolean] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<label class="biss-checkbox"
  ><input
    type="checkbox"
    {disabled}
    {checked}
    onchange={(e) => {
      checked = e.currentTarget.checked;
      emit('change', checked);
    }}
  /><span
    >{label}{#if description}<small>{description}</small>{/if}</span
  ></label
>
