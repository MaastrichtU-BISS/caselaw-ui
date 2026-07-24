<script lang="ts">
  export let href: string | undefined = undefined;
  export let variant: "primary" | "secondary" = "primary";
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled = false;

  $: className = variant === "secondary" ? "cle-button cle-button-secondary" : "cle-button";
</script>

{#if href}
  <a class={className} {href} aria-disabled={disabled} {...$$restProps}>
    <slot />
  </a>
{:else}
  <button class={className} {type} {disabled} {...$$restProps}>
    <slot />
  </button>
{/if}
