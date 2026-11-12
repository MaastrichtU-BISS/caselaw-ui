<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    color = 'var(--biss-primary)',
    soft = true,
  }: { label: string; color?: string; soft?: boolean } = $props();
</script>

<span class="biss-status-cell" data-soft={soft} style:--status-color={color}
  ><i aria-hidden="true"></i>{label}</span
>
