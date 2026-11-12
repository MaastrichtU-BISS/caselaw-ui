<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  let {
    href,
    title,
    description = undefined,
    site = undefined,
  }: {
    href: string;
    title: string;
    description?: string | undefined;
    site?: string | undefined;
  } = $props();
</script>

<a class="biss-bookmark" {href}
  ><BissIcon name="link" /><span
    ><b>{title}</b>{#if description}<span>{description}</span>{/if}<small>{site ?? href}</small
    ></span
  ></a
>
