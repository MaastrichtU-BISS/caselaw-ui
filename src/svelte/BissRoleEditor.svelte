<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissCheckbox from './BissCheckbox.svelte';
  import type { BissPermission } from '../core/types';
  import { toggleValue } from '../core/format';
  let {
    permissions,
    selected = [],
    label = 'Role permissions',
    readonly = false,
    onchange,
  }: {
    permissions: BissPermission[];
    selected?: string[];
    label?: string;
    readonly?: boolean;
    onchange?: (permissions: string[]) => void;
  } = $props();
  type Events = { change: [permissions: string[]] };
  const handlers = {
    get change() {
      return onchange;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-role-editor" aria-label={label}>
  <h3>{label}</h3>
  {#each permissions as permission, i (permission.key)}{#if permission.group && permission.group !== permissions[i - 1]?.group}<h4
      >
        {permission.group}
      </h4>{/if}<BissCheckbox
      label={permission.label}
      description={permission.description}
      checked={selected.includes(permission.key)}
      disabled={readonly || permission.disabled}
      onchange={() => emit('change', toggleValue(selected, permission.key))}
    />{/each}
</section>
