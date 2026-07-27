<script lang="ts">
  import type { CleServiceIconName } from "../icons";
  import CleCard from "./CleCard.svelte";
  import CleServiceIcon from "./CleServiceIcon.svelte";

  export let icon: CleServiceIconName | undefined = undefined;
  export let title: string;
  /** Ignored when the default slot is used, so markup is possible. */
  export let copy: string = "";
</script>

<CleCard padded={false}>
  <div class="cle-feature-card">
    {#if icon}<CleServiceIcon {icon} />{/if}
    <h3 class="cle-feature-card-title">{title}</h3>
    <p class="cle-feature-card-copy"><slot>{copy}</slot></p>
  </div>
</CleCard>
