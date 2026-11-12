<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    label,
    href = undefined,
    icon = 'file',
    meta = undefined,
  }: {
    label: string;
    href?: string | undefined;
    icon?: BissIconName;
    meta?: string | undefined;
  } = $props();
</script>

{#if href}<a class="biss-record-chip" {href}
    ><BissIcon name={icon} /><span>{label}</span>{#if meta}<small>{meta}</small>{/if}</a
  >{:else}<span class="biss-record-chip"
    ><BissIcon name={icon} /><span>{label}</span>{#if meta}<small>{meta}</small>{/if}</span
  >{/if}
