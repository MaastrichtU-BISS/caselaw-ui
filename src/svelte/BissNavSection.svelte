<script lang="ts">
  export let heading: string | undefined = undefined;
  export let empty: string | undefined = undefined;
</script>

<nav class="biss-nav-section" aria-label={heading}>
  {#if heading}
    <div class="biss-nav-heading">
      <span>{heading}</span>
      <slot name="action" />
    </div>
  {/if}
  <slot />
  {#if empty}
    <p class="biss-nav-empty">{empty}</p>
  {/if}
</nav>
