<script lang="ts">
  import type { BissServiceIconName } from "../icons";
  import BissCard from "./BissCard.svelte";
  import BissServiceIcon from "./BissServiceIcon.svelte";

  export let icon: BissServiceIconName | undefined = undefined;
  export let title: string;
  /** Ignored when the default slot is used, so markup is possible. */
  export let copy: string = "";
</script>

<BissCard padded={false}>
  <div class="biss-feature-card">
    {#if icon}<BissServiceIcon {icon} />{/if}
    <h3 class="biss-feature-card-title">{title}</h3>
    <p class="biss-feature-card-copy"><slot>{copy}</slot></p>
  </div>
</BissCard>
