<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    title = 'Access restricted',
    description = 'Contact the owner to request access.',
    actions,
  }: { title?: string; description?: string; actions?: Snippet } = $props();
</script>

<div class="biss-no-access">
  <BissIcon name="lock" />
  <h2>{title}</h2>
  <p>{description}</p>
  {#if actions}{@render actions()}{/if}
</div>
