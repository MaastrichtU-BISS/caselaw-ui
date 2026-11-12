<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissPickOption } from '../core/types';
  let {
    options,
    value = $bindable(''),
    label,
    disabled = false,
    onchange,
  }: {
    options: BissPickOption[];
    value?: string;
    label: string;
    disabled?: boolean;
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
  const uid = $props.id();
</script>

<fieldset class="biss-radio-group">
  <legend>{label}</legend>{#each options as option (option.value)}<label class="biss-checkbox"
      ><input
        type="radio"
        name={uid}
        value={option.value}
        checked={value === option.value}
        disabled={disabled || option.disabled}
        onchange={() => {
          value = option.value;
          emit('change', value);
        }}
      /><span
        >{option.label}{#if option.description}<small>{option.description}</small>{/if}</span
      ></label
    >{/each}
</fieldset>
