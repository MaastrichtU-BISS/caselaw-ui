<script lang="ts">
  import type { BissCrumb } from "../types";

  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let crumbs: BissCrumb[] = [];
  /** Defaults to "was the slot given". A wrapper forwards unconditionally, so
      it has to say. */
  export let actions: boolean | undefined = undefined;

  $: showActions = actions ?? Boolean($$slots.actions);
</script>

<header>
  {#if crumbs.length}
    <nav class="biss-breadcrumbs" aria-label="Breadcrumb">
      {#each crumbs as crumb, index}
        {#if index > 0}
          <span class="biss-breadcrumb-sep" aria-hidden="true">/</span>
        {/if}
        {#if crumb.href}
          <a href={crumb.href}>{crumb.label}</a>
        {:else}
          <span aria-current="page">{crumb.label}</span>
        {/if}
      {/each}
    </nav>
  {/if}
  <div class="biss-console-header">
    <div>
      <h1 class="biss-console-title">{title}</h1>
      {#if subtitle}
        <p class="biss-console-subtitle">{subtitle}</p>
      {/if}
    </div>
    {#if showActions}
      <div class="biss-console-header-actions">
        <slot name="actions" />
      </div>
    {/if}
  </div>
  <slot />
</header>
