<script lang="ts">
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
  <span class="cle-sidebar-user-avatar" aria-hidden="true">{badge}</span>
  <span class="cle-sidebar-user-text">
    <span class="cle-sidebar-user-name">{name}</span>
    {#if email && email !== name}
      <span class="cle-sidebar-user-email">{email}</span>
    {/if}
  </span>
  {#if $$slots.actions}
    <span class="cle-sidebar-user-actions">
      <slot name="actions" />
    </span>
  {/if}
</div>
