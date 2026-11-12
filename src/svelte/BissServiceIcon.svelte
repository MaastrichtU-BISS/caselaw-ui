<script lang="ts">
  import { bissServiceIconLabels, bissServiceIconPaths, type BissServiceIconName } from "../icons";

  export let icon: BissServiceIconName | undefined = undefined;
  export let mark = "CLE";
  export let label: string | undefined = undefined;

  $: iconLabel = label ?? (icon ? bissServiceIconLabels[icon] : mark);
</script>

<span class="biss-brand-mark" aria-label={iconLabel} role="img">
  {#if icon}
    <svg viewBox="0 0 24 24" aria-hidden="true" class="biss-service-icon">
      <path d={bissServiceIconPaths[icon]} />
    </svg>
  {:else}
    <span>{mark}</span>
  {/if}
</span>
