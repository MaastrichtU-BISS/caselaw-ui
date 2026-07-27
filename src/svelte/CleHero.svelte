<script lang="ts">
  /**
   * The centred hero every Case Law Explorer entry page opens with.
   * Mirrors the Vue component; both take their sizes from the shared tokens,
   * which is what keeps the products agreeing on how big a landing title is.
   */
  import CleHeroPill from "./CleHeroPill.svelte";

  export let eyebrow: string = "";
  export let title: string;
  export let subtitle: string = "";
  export let pills: string[] = [];
  export let align: "center" | "start" = "center";
</script>

<header class="cle-hero cle-hero-{align}">
  {#if pills.length || $$slots.pills}
    <div class="cle-hero-pills">
      {#each pills as pill (pill)}
        <CleHeroPill>{pill}</CleHeroPill>
      {/each}
      <slot name="pills" />
    </div>
  {/if}

  {#if eyebrow}<p class="cle-eyebrow">{eyebrow}</p>{/if}
  <h1 class="cle-hero-title">{title}</h1>
  {#if subtitle}<p class="cle-hero-subtitle">{subtitle}</p>{/if}

  {#if $$slots.actions}
    <div class="cle-hero-actions"><slot name="actions" /></div>
  {/if}

  <slot />
</header>
