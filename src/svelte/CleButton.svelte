<script lang="ts">
  export let href: string | undefined = undefined;
  export let variant: "primary" | "secondary" | "ghost" | "danger" | "danger-quiet" = "primary";
  export let size: "md" | "sm" = "md";
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled = false;
  export let block = false;
  /** Square, sized to a field rather than to text. Needs an aria-label. */
  export let icon = false;

  $: className = [
    "cle-button",
    variant === "primary" ? "" : `cle-button-${variant}`,
    size === "sm" ? "cle-button-sm" : "",
    block ? "cle-button-block" : "",
    icon ? "cle-button-icon" : "",
  ]
    .filter(Boolean)
    .join(" ");
</script>

<!--
  Events are forwarded explicitly. $$restProps carries attributes but not
  listeners, so a caller's on:click was accepted and dropped, and a button
  that does nothing when pressed reads as a broken action rather than a
  missing binding. CleConfirmDialog is built on this, so every confirmation
  in the library had an inert Confirm and an inert Cancel.
-->
{#if href}
  <a
    class={className}
    {href}
    aria-disabled={disabled}
    {...$$restProps}
    on:click
    on:keydown
    on:focus
    on:blur
  >
    <slot />
  </a>
{:else}
  <button
    class={className}
    {type}
    {disabled}
    {...$$restProps}
    on:click
    on:keydown
    on:focus
    on:blur
  >
    <slot />
  </button>
{/if}
