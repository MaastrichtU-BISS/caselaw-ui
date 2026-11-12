<script lang="ts">
  import {
    bissServiceIconLabels,
    bissServiceIconPaths,
    type BissServiceIconName,
  } from '../core/service-icons';

  interface Props {
    icon?: BissServiceIconName | undefined;
    mark?: string;
    label?: string | undefined;
  }

  let { icon = undefined, mark = 'B', label = undefined }: Props = $props();

  let iconLabel = $derived(label ?? (icon ? bissServiceIconLabels[icon] : mark));
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
