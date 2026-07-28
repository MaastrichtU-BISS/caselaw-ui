<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CleConfirmDialog from "./CleConfirmDialog.svelte";

  /**
   * Who is signed in, shown at the foot of a console sidebar.
   *
   * Deliberately not a dropdown. A console sidebar is already a click target
   * for navigation, and hiding one or two actions behind a menu costs a click
   * to save nothing — they fit on the row itself, trailing the name.
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

  function requestSignOut() {
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

<div class="cle-sidebar-user">
  {#if accountHref}
    <a class="cle-sidebar-user-identity is-linked" href={accountHref} title={accountLabel}>
      <span class="cle-sidebar-user-avatar" aria-hidden="true">{badge}</span>
      <span class="cle-sidebar-user-text">
        <span class="cle-sidebar-user-name">{name}</span>
        {#if email && email !== name}
          <span class="cle-sidebar-user-email">{email}</span>
        {/if}
      </span>
    </a>
  {:else}
    <span class="cle-sidebar-user-identity">
      <span class="cle-sidebar-user-avatar" aria-hidden="true">{badge}</span>
      <span class="cle-sidebar-user-text">
        <span class="cle-sidebar-user-name">{name}</span>
        {#if email && email !== name}
          <span class="cle-sidebar-user-email">{email}</span>
        {/if}
      </span>
    </span>
  {/if}
  {#if $$slots.actions || signOut}
    <span class="cle-sidebar-user-actions">
      <slot name="actions" />
      {#if signOut}
        <button
          type="button"
          class="cle-icon-button cle-icon-button-danger"
          title={signOutLabel}
          aria-label={signOutLabel}
          on:click={requestSignOut}
        >
          <!-- Inlined rather than slotted: a sign-out control that needs the
               caller to supply its own glyph is not a component, it is a
               convention nobody follows twice the same way. -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      {/if}
    </span>
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
