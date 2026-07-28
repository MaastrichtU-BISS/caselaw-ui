<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CleConfirmDialog from "./CleConfirmDialog.svelte";

  /**
   * Who is signed in, shown at the foot of a console sidebar.
   *
   * A menu, since the row grew past the two actions that fitted on it. The
   * email was doing the identifying and it is the thing that truncates: nobody
   * is "david.wicker@maastrichtunive...". The name goes on the row, the
   * address moves into the menu where it has room to be read, and account and
   * sign-out become labelled items rather than an icon a person has to guess
   * at.
   */
  export let name: string;
  export let email: string | undefined = undefined;
  /** Two letters at most. Derived from the name when not given. */
  export let initials: string | undefined = undefined;
  /**
   * Where the account lives. Set it and the identity becomes a link.
   *
   * The block already names who you are, which makes it the thing people
   * reach for when they want to do something about that, and until now it
   * did nothing when clicked. Every console shows this widget, so pointing
   * it at one account page is what stops each product growing its own.
   */
  export let accountHref: string | undefined = undefined;
  export let accountLabel = "Your account";
  /** Render the sign-out control. */
  export let signOut = false;
  export let signOutLabel = "Sign out";
  /**
   * Skip the confirmation. Off by default: signing out is one small click
   * away from every navigation target in the sidebar, and the cost of an
   * accidental one is re-authenticating.
   */
  export let confirmSignOut = true;
  export let signOutTitle = "Sign out?";
  export let signOutCopy: string | undefined = undefined;
  /** Disables the dialog's buttons while the sign-out is in flight. */
  export let busy = false;

  const dispatch = createEventDispatcher<{ signOut: void }>();
  let confirming = false;
  let open = false;
  let trigger: HTMLButtonElement | null = null;
  let menu: HTMLElement | null = null;
  let position = { left: 0, bottom: 0, width: 0 };

  function place() {
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    // Anchored to the trigger and measured from the bottom of the viewport,
    // because this widget sits at the foot of a sidebar and the menu opens
    // upward from it.
    position = {
      left: rect.left,
      bottom: window.innerHeight - rect.top + 6,
      width: Math.max(rect.width, 208),
    };
  }

  function toggle() {
    open = !open;
    if (open) place();
  }

  function close() {
    open = false;
    trigger?.focus();
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (open && event.key === "Escape") {
      event.stopPropagation();
      close();
    }
  }

  function onWindowPointerDown(event: PointerEvent) {
    if (!open) return;
    const target = event.target as Node;
    if (menu?.contains(target) || trigger?.contains(target)) return;
    open = false;
  }

  /**
   * Out to <body>, for the same reason the modal goes there: a sidebar is a
   * scroll container with its own stacking context, and a menu that opens
   * upward out of its last row is clipped by both.
   */
  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.parentNode?.removeChild(node);
      },
    };
  }

  function goAccount() {
    open = false;
  }

  function requestSignOut() {
    open = false;
    if (confirmSignOut) {
      confirming = true;
      return;
    }
    dispatch("signOut");
  }

  function confirmed() {
    confirming = false;
    dispatch("signOut");
  }

  function derive(source: string): string {
    const value = (source || "").trim();
    if (!value) return "?";
    // "Ada Lovelace" -> AL, but "ada@example.org" -> AD, because splitting an
    // address on spaces yields one very long "word".
    const words = value.split(/\s+/).filter(Boolean);
    if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
    return value.slice(0, 2).toUpperCase();
  }

  $: badge = initials ? initials.slice(0, 2).toUpperCase() : derive(name || email || "");
</script>

<svelte:window on:keydown={onWindowKeydown} on:pointerdown={onWindowPointerDown} on:resize={() => open && place()} />

<div class="cle-sidebar-user">
  <button
    bind:this={trigger}
    type="button"
    class="cle-sidebar-user-identity is-menu"
    aria-haspopup="menu"
    aria-expanded={open}
    on:click={toggle}
  >
    <span class="cle-sidebar-user-avatar" aria-hidden="true">{badge}</span>
    <span class="cle-sidebar-user-text">
      <!-- The name, not the address. The address is in the menu. -->
      <span class="cle-sidebar-user-name">{name}</span>
    </span>
    <svg
      class="cle-sidebar-user-chevron"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>

  {#if open}
    <div
      use:portal
      bind:this={menu}
      class="cle-user-menu"
      role="menu"
      tabindex="-1"
      style="left: {position.left}px; bottom: {position.bottom}px; min-width: {position.width}px;"
    >
      {#if email}
        <p class="cle-user-menu-email" title={email}>{email}</p>
      {/if}

      {#if accountHref}
        <a class="cle-user-menu-item" role="menuitem" href={accountHref} on:click={goAccount}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {accountLabel}
        </a>
      {/if}

      <slot name="menu" />

      {#if signOut}
        {#if accountHref || $$slots.menu}
          <hr class="cle-user-menu-separator" />
        {/if}
        <button type="button" class="cle-user-menu-item is-danger" role="menuitem" on:click={requestSignOut}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {signOutLabel}
        </button>
      {/if}
    </div>
  {/if}

  {#if signOut && confirmSignOut}
    <CleConfirmDialog
      bind:open={confirming}
      title={signOutTitle}
      confirmLabel={signOutLabel}
      {busy}
      on:confirm={confirmed}
    >
      <p class="cle-modal-copy">
        {signOutCopy ||
          `${name} will be signed out of every Case Law Explorer console sharing this account.`}
      </p>
    </CleConfirmDialog>
  {/if}
</div>
