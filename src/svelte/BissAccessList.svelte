<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import BissAvatar from './BissAvatar.svelte';
  import BissSelectPicker from './BissSelectPicker.svelte';
  import type { BissAccessEntry, BissPickOption } from '../core/types';
  let {
    roleLabel = 'Role: {name}',

    entries,
    roles,
    label = 'Who has access',
    inheritedLabel = 'From workspace',
    removeLabel = 'Remove access',
    onrole,
    onremove,
  }: {
    roleLabel?: string;

    entries: BissAccessEntry[];
    roles: BissPickOption[];
    label?: string;
    inheritedLabel?: string;
    removeLabel?: string;
    onrole?: (value: { id: string; role: string }) => void;
    onremove?: (id: string) => void;
  } = $props();
  type Events = { role: [value: { id: string; role: string }]; remove: [id: string] };
  const handlers = {
    get role() {
      return onrole;
    },
    get remove() {
      return onremove;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-access-list" aria-label={label}>
  <h3>{label}</h3>
  {#each entries as entry (entry.id)}<div class="biss-access-row">
      <BissAvatar name={entry.name} size={28} />
      <div class="biss-grow">
        <b>{entry.name}</b><small>{entry.email ?? ''}</small>{#if entry.inherited}<small
            >{inheritedLabel}</small
          >{/if}
      </div>
      {#if entry.editable && !entry.inherited}<BissSelectPicker
          label={roleLabel.replace('{name}', entry.name)}
          value={entry.role}
          options={roles}
          onchange={(role) => emit('role', { id: entry.id, role })}
        />{:else}<span class="biss-access-role"
          >{roles.find((r) => r.value === entry.role)?.label ?? entry.role}</span
        >{/if}{#if entry.editable && !entry.inherited}<button
          type="button"
          class="biss-header-action"
          aria-label={removeLabel + ' ' + entry.name}
          onclick={() => emit('remove', entry.id)}><BissIcon name="x" /></button
        >{/if}
    </div>{/each}
</section>
