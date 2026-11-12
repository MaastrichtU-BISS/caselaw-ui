<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissGoalBar from './BissGoalBar.svelte';
  let {
    title,
    progress,
    label,
    expected = undefined,
    status = undefined,
    tone = 'primary',
    href = undefined,
    children,
    actions,
  }: {
    title: string;
    progress: number | null;
    label: string;
    expected?: number | undefined;
    status?: string | undefined;
    tone?: 'primary' | 'success' | 'danger' | 'warning';
    href?: string | undefined;
    children?: Snippet;
    actions?: Snippet;
  } = $props();
</script>

<article class="biss-goal-card">
  <header>
    {#if href}<a {href}>{title}</a>{:else}<h3>{title}</h3>{/if}{#if actions}{@render actions()}{/if}
  </header>
  {#if status}<p>{status}</p>{/if}<BissGoalBar value={progress} {expected} {label} {tone} />
  <footer>
    <span>{progress === null ? '—' : Math.round(progress * 100) + '%'}</span
    >{#if children}{@render children()}{/if}
  </footer>
</article>
