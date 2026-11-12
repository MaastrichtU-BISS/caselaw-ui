<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    hint,
    error,
    optional = false,
    children,
  }: {
    label?: string;
    hint?: string;
    error?: string;
    optional?: boolean;
    children?: Snippet<[{ id: string; invalid: boolean }]>;
  } = $props();
  const id = $props.id();
</script>

<div class="biss-field">
  {#if label}<label class="biss-field-label" for={id}
      >{label}{#if optional}<span class="biss-field-optional">optional</span>{/if}</label
    >{/if}{#if children}{@render children({ id, invalid: !!error })}{/if}{#if error}<p
      class="biss-field-error"
    >
      {error}
    </p>{:else if hint}<p class="biss-field-hint">{hint}</p>{/if}
</div>
