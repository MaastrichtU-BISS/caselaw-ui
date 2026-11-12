<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissAvatar from './BissAvatar.svelte';
  import type { BissPerson } from '../library-types';
  let {
    people,
    limit = 4,
    size = 22,
    label = 'People here',
    selfId = undefined,
    children,
  }: {
    people: BissPerson[];
    limit?: number;
    size?: number;
    label?: string;
    selfId?: string | undefined;
    children?: Snippet;
  } = $props();

  let others = $derived(people.filter((p) => p.id !== selfId));
</script>

<div class="biss-presence" role="group" aria-label={label}>
  {#each others.slice(0, Math.max(0, limit)) as person (person.id)}<span title={person.name}
      ><BissAvatar name={person.name} {size} /></span
    >{/each}{#if others.length > limit}<span
      title={others
        .slice(limit)
        .map((p) => p.name)
        .join(', ')}>+{others.length - limit}</span
    >{/if}{#if children}{@render children()}{/if}
</div>
