<script lang="ts">
  /**
   * The centred hero every Case Law Explorer entry page opens with.
   * Mirrors the Vue component; both take their sizes from the shared tokens,
   * which is what keeps the products agreeing on how big a landing title is.
   */
  import BissHeroPill from "./BissHeroPill.svelte";

  export let eyebrow: string = "";
  export let title: string;
  export let subtitle: string = "";
  export let pills: string[] = [];
  export let align: "center" | "start" = "center";
</script>

<header class="biss-hero biss-hero-{align}">
  {#if pills.length || $$slots.pills}
    <div class="biss-hero-pills">
      {#each pills as pill (pill)}
        <BissHeroPill>{pill}</BissHeroPill>
      {/each}
      <slot name="pills" />
    </div>
  {/if}

  {#if eyebrow}<p class="biss-eyebrow">{eyebrow}</p>{/if}
  <h1 class="biss-hero-title">{title}</h1>
  {#if subtitle}<p class="biss-hero-subtitle">{subtitle}</p>{/if}

  {#if $$slots.actions}
    <div class="biss-hero-actions"><slot name="actions" /></div>
  {/if}

  <slot />
</header>
