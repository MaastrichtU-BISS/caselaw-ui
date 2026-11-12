<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissAvatar from './BissAvatar.svelte';
  import type { BissPerson } from '../library-types';
  let {
    people,
    empty = 'Unassigned',
    limit = 3,
  }: { people: BissPerson[]; empty?: string; limit?: number } = $props();
</script>

<span class="biss-people-cell"
  >{#each people.slice(0, limit) as person (person.id)}<span
      ><BissAvatar name={person.name} size={20} />{person.name}</span
    >{/each}{#if people.length > limit}<small>+{people.length - limit}</small
    >{/if}{#if !people.length}<span class="biss-muted">{empty}</span>{/if}</span
>
