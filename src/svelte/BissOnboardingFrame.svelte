<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    description = undefined,
    step = undefined,
    steps = undefined,
    children,
    actions,
  }: {
    title: string;
    description?: string | undefined;
    step?: number | undefined;
    steps?: number | undefined;
    children?: Snippet;
    actions?: Snippet;
  } = $props();
</script>

<section class="biss-onboarding">
  <header>
    {#if step !== undefined && steps !== undefined}<small>{step} / {steps}</small>{/if}
    <h1>{title}</h1>
    {#if description}<p>{description}</p>{/if}
  </header>
  {#if children}{@render children()}{/if}
  <footer>
    {#if actions}{@render actions()}{/if}
  </footer>
</section>
