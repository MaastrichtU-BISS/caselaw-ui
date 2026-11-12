<script lang="ts">
  import type { Snippet } from 'svelte';
  import * as Dialog from './dialog';
  import BissIcon from './BissIcon.svelte';
  import {
    bissDialogTheme as theme,
    type BissDialogUi,
    type BissDialogSize,
  } from '../theme/dialog';
  let {
    open = $bindable(false),
    title,
    description,
    width,
    size = 'md',
    closeLabel = 'Close',
    busy = false,
    portal = false,
    ui,
    onclose,
    onOpenChange,
    children,
    actions,
  }: {
    open?: boolean;
    title: string;
    description?: string;
    width?: number;
    size?: BissDialogSize;
    closeLabel?: string;
    busy?: boolean;
    portal?: boolean;
    ui?: BissDialogUi;
    onclose?: () => void;
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
    actions?: Snippet;
  } = $props();
  let previous: HTMLElement | null = null;
  let content = $state<HTMLElement | null>(null);
  $effect.pre(() => {
    if (open) previous = document.activeElement as HTMLElement;
  });
  function update(value: boolean) {
    if (!value && busy) return;
    open = value;
    onOpenChange?.(value);
    if (!value) onclose?.();
  }
  function autofocus(event: Event) {
    const node = content?.querySelector<HTMLElement>('[data-biss-autofocus],[autofocus]');
    if (node) {
      event.preventDefault();
      node.focus();
    }
  }
  function restore(event: Event) {
    if (previous?.isConnected) {
      event.preventDefault();
      previous.focus();
    }
  }
</script>

<Dialog.Root {open} onOpenChange={update}
  ><Dialog.Portal disabled={!portal}
    ><Dialog.Overlay class={ui?.overlay} /><Dialog.Content
      bind:ref={content}
      {width}
      {size}
      class={ui?.content}
      aria-busy={busy || undefined}
      onEscapeKeydown={(e) => {
        if (busy) e.preventDefault();
      }}
      onInteractOutside={(e) => {
        if (busy) e.preventDefault();
      }}
      onOpenAutoFocus={autofocus}
      onCloseAutoFocus={restore}
      ><header class={[theme.slots.header, ui?.header]}>
        <div class="biss-grow">
          <Dialog.Title class={[theme.slots.title, ui?.title]}>{title}</Dialog.Title
          >{#if description}<Dialog.Description class={[theme.slots.description, ui?.description]}
              >{description}</Dialog.Description
            >{:else}<Dialog.Description class="biss-visually-hidden">{title}</Dialog.Description
            >{/if}
        </div>
        <Dialog.Close
          disabled={busy}
          class={['biss-header-action', theme.slots.close, ui?.close]}
          aria-label={closeLabel}><BissIcon name="x" /></Dialog.Close
        >
      </header>
      <div class={[theme.slots.body, ui?.body]}>{@render children?.()}</div>
      {#if actions}<footer class={[theme.slots.footer, ui?.footer]}>
          {@render actions()}
        </footer>{/if}</Dialog.Content
    ></Dialog.Portal
  ></Dialog.Root
>
