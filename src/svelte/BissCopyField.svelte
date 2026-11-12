<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    copyLabel = 'Copy',
    copiedLabel = 'Copied',
    value,
    label = 'Copy value',
    multiline = false,
  }: {
    copyLabel?: string;
    copiedLabel?: string;
    value: string;
    label?: string;
    multiline?: boolean;
  } = $props();
  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 1600);
    } catch {
      copied = false;
    }
  }
  $effect(() => () => clearTimeout(timer));
</script>

<div class="biss-copy-field" class:biss-copy-field-multiline={multiline}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable values need keyboard focus; the named region identifies the content.) -->
  <code class="biss-copy-value" tabindex="0" role="region" aria-label={label}>{value}</code><button
    class="biss-copy-button"
    type="button"
    aria-label={label}
    onclick={copy}>{copied ? copiedLabel : copyLabel}</button
  >
</div>
