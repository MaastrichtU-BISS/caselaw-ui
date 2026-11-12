<script lang="ts">
  import type { BissServiceIconName } from '../core/service-icons';
  import BissCard from './BissCard.svelte';
  import BissServiceIcon from './BissServiceIcon.svelte';

  interface Props {
    icon?: BissServiceIconName | undefined;
    title: string;
    /** Ignored when the default slot is used, so markup is possible. */
    copy?: string;
    children?: import('svelte').Snippet;
  }

  let { icon = undefined, title, copy = '', children }: Props = $props();
</script>

<BissCard padded={false}>
  <div class="biss-feature-card">
    {#if icon}<BissServiceIcon {icon} />{/if}
    <h3 class="biss-feature-card-title">{title}</h3>
    <p class="biss-feature-card-copy">
      {#if children}{@render children()}{:else}{copy}{/if}
    </p>
  </div>
</BissCard>
