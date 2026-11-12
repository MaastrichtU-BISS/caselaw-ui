<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  let { label, text, children }: { label: string; text: string; children?: Snippet } = $props();
</script>

<details class="biss-page-hint">
  <summary aria-label={label}><BissIcon name="info" /></summary>
  <p>
    {text}{#if children}{@render children()}{/if}
  </p>
</details>
