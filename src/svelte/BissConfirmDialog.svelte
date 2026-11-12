<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissModal from './BissModal.svelte';
  import BissButton from './BissButton.svelte';
  let {
    open = $bindable(false),
    title,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    tone = 'danger',
    busy = false,
    children,
    onconfirm,
  }: {
    open?: boolean;
    title: string;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: 'danger' | 'primary';
    busy?: boolean;
    children?: Snippet;
    onconfirm?: () => void;
  } = $props();
</script>

<BissModal bind:open {title} size="sm" {busy}
  >{@render children?.()}{#snippet footer()}<BissButton
      variant="secondary"
      data-biss-autofocus
      disabled={busy}
      onclick={() => (open = false)}>{cancelLabel}</BissButton
    ><BissButton variant={tone} disabled={busy} onclick={() => onconfirm?.()}
      >{confirmLabel}</BissButton
    >{/snippet}</BissModal
>
