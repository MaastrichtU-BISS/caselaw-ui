<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import { safeLink } from '../core/collections';
  let {
    title,
    kind,
    description = undefined,
    href = undefined,
    restricted = false,
    restrictedLabel = 'A record you cannot access',
    icon = 'file',
  }: {
    title: string;
    kind: string;
    description?: string | undefined;
    href?: string | undefined;
    restricted?: boolean;
    restrictedLabel?: string;
    icon?: BissIconName;
  } = $props();
</script>

<article class="biss-record-preview">
  {#if restricted}<BissIcon name="lock" /><span>{restrictedLabel}</span>{:else}<BissIcon
      name={icon}
    />
    <div>
      <small>{kind}</small>{#if href}<a href={safeLink(href)}>{title}</a>{:else}<b>{title}</b
        >{/if}{#if description}<p>{description}</p>{/if}
    </div>{/if}
</article>
