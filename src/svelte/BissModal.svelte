<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissDialog from './BissDialog.svelte';
  let {
    open = $bindable(false),
    title,
    subtitle,
    size = 'md',
    busy = false,
    children,
    footer,
    onclose,
  }: {
    open?: boolean;
    title: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg';
    busy?: boolean;
    children?: Snippet;
    footer?: Snippet;
    onclose?: () => void;
  } = $props();
</script>

<BissDialog
  {open}
  {title}
  description={subtitle}
  width={size === 'sm' ? 440 : size === 'lg' ? 760 : 520}
  {busy}
  onclose={() => {
    open = false;
    onclose?.();
  }}>{@render children?.()}{#snippet actions()}{@render footer?.()}{/snippet}</BissDialog
>
