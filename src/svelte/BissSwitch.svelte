<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    modelValue = $bindable(false),
    label,
    hint,
    disabled = false,
    onchange,
  }: {
    modelValue?: boolean;
    label: string;
    hint?: string;
    disabled?: boolean;
    onchange?: (value: boolean) => void;
  } = $props();
</script>

<label class="biss-switch"
  ><input
    type="checkbox"
    {disabled}
    checked={modelValue}
    onchange={(e) => {
      modelValue = e.currentTarget.checked;
      onchange?.(modelValue);
    }}
  /><span class="biss-switch-track"><span class="biss-switch-thumb"></span></span><span
    class="biss-switch-text"
    ><span class="biss-switch-label">{label}</span>{#if hint}<span class="biss-switch-hint"
        >{hint}</span
      >{/if}</span
  ></label
>
