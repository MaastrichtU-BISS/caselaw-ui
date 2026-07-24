<script lang="ts">
  import { cleServiceIconLabels, cleServiceIconPaths, type CleServiceIconName } from "../icons";

  export let icon: CleServiceIconName | undefined = undefined;
  export let mark = "CLE";
  export let label: string | undefined = undefined;

  $: iconLabel = label ?? (icon ? cleServiceIconLabels[icon] : mark);
</script>

<span class="cle-brand-mark" aria-label={iconLabel} role="img">
  {#if icon}
    <svg viewBox="0 0 24 24" aria-hidden="true" class="cle-service-icon">
      <path d={cleServiceIconPaths[icon]} />
    </svg>
  {:else}
    <span>{mark}</span>
  {/if}
</span>
