<script lang="ts">
  import { tick, onDestroy } from "svelte";

  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let size: "sm" | "md" | "lg" = "md";
  /** Blocks backdrop and escape dismissal while a request is in flight. */
  export let busy = false;
  export let open = false;
  /** Defaults to "was the slot given". A wrapper forwards unconditionally. */
  export let footer: boolean | undefined = undefined;

  let panel: HTMLElement | null = null;
  let lastFocused: HTMLElement | null = null;

  $: showFooter = footer ?? Boolean($$slots.footer);

  function close() {
    if (busy) return;
    open = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== "Tab" || !panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) close();
  }

  async function sync(isOpen: boolean) {
    if (typeof document === "undefined") return;
    if (isOpen) {
      lastFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      await tick();
      // An explicit target first. Falling back to "first focusable in DOM
      // order" lands on the close button in any dialog without a form field,
      // which for a destructive confirmation means the dismiss control is
      // highlighted instead of the safe one.
      const target =
        panel?.querySelector<HTMLElement>("[data-cle-autofocus]") ||
        panel?.querySelector<HTMLElement>(
          'input:not([type="checkbox"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])',
        );
      (target || panel)?.focus();
    } else {
      document.body.style.overflow = "";
      lastFocused?.focus();
      lastFocused = null;
    }
  }

  $: void sync(open);

  onDestroy(() => {
    if (typeof document !== "undefined") document.body.style.overflow = "";
  });
</script>

{#if open}
  <!-- No Teleport in Svelte; the backdrop is fixed-position, so it covers the
       viewport wherever it is mounted. -->
  <div class="cle-modal-backdrop" on:keydown={onKeydown} on:mousedown={onBackdrop} role="presentation">
    <div
      bind:this={panel}
      class="cle-modal {size === 'md' ? '' : `cle-modal-${size}`}"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabindex="-1"
    >
      <header class="cle-modal-header">
        <div>
          <h2 class="cle-modal-title">{title}</h2>
          {#if subtitle}
            <p class="cle-modal-subtitle">{subtitle}</p>
          {/if}
        </div>
        <button type="button" class="cle-modal-close" aria-label="Close dialog" disabled={busy} on:click={close}>
          &times;
        </button>
      </header>
      <div class="cle-modal-body">
        <slot />
      </div>
      {#if showFooter}
        <footer class="cle-modal-footer">
          <slot name="footer" />
        </footer>
      {/if}
    </div>
  </div>
{/if}
