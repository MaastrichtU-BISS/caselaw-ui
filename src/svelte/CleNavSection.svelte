<script lang="ts">
  export let heading: string | undefined = undefined;
  export let empty: string | undefined = undefined;
</script>

<nav class="cle-nav-section" aria-label={heading}>
  {#if heading}
    <div class="cle-nav-heading">
      <span>{heading}</span>
      <slot name="action" />
    </div>
  {/if}
  <slot />
  {#if empty}
    <p class="cle-nav-empty">{empty}</p>
  {/if}
</nav>
