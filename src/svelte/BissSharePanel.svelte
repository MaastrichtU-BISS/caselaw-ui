<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissSelectPicker from './BissSelectPicker.svelte';
  import BissAccessList from './BissAccessList.svelte';
  import BissCopyField from './BissCopyField.svelte';
  import type { BissAccessEntry, BissPickOption } from '../core/types';
  let {
    roleLabel = 'Invitation role',
    linkLabel = 'Copy shared link',
    accessLabels = {},
    copyLabel = 'Copy',
    copiedLabel = 'Copied',

    entries,
    roles,
    label = 'Share project',
    inviteLabel = 'Invite',
    emailLabel = 'Email address',
    busy = false,
    error = undefined,
    link = undefined,
    oninvite,
    onrole,
    onremove,
  }: {
    roleLabel?: string;
    linkLabel?: string;
    accessLabels?: {
      label?: string;
      inheritedLabel?: string;
      removeLabel?: string;
      roleLabel?: string;
    };
    copyLabel?: string;
    copiedLabel?: string;

    entries: BissAccessEntry[];
    roles: BissPickOption[];
    label?: string;
    inviteLabel?: string;
    emailLabel?: string;
    busy?: boolean;
    error?: string | undefined;
    link?: string | undefined;
    oninvite?: (value: { email: string; role: string }) => void;
    onrole?: (value: { id: string; role: string }) => void;
    onremove?: (id: string) => void;
  } = $props();
  type Events = {
    invite: [value: { email: string; role: string }];
    role: [value: { id: string; role: string }];
    remove: [id: string];
  };
  const handlers = {
    get invite() {
      return oninvite;
    },
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
  let email = $state('');
  let role = $state('');
  function invite() {
    if (!busy && email.trim())
      emit('invite', { email: email.trim(), role: role || roles[0]?.value || '' });
  }
</script>

<section class="biss-share-panel" aria-label={label}>
  <h3>{label}</h3>
  <form
    onsubmit={(e) => {
      e.preventDefault();
      invite();
    }}
  >
    <input
      class="biss-input"
      type="email"
      required
      bind:value={email}
      aria-label={emailLabel}
      placeholder={emailLabel}
      disabled={busy}
    /><BissSelectPicker
      label={roleLabel}
      value={role || roles[0]?.value || ''}
      options={roles}
      disabled={busy}
      onchange={(v) => (role = v)}
    /><button type="submit" class="biss-button" disabled={busy || !email.trim()}
      >{inviteLabel}</button
    >
  </form>
  {#if error}<p class="biss-field-error" role="alert">{error}</p>{/if}<BissAccessList
    {...accessLabels}
    {entries}
    {roles}
    onrole={(v) => emit('role', v)}
    onremove={(v) => emit('remove', v)}
  />{#if link}<BissCopyField value={link} label={linkLabel} {copyLabel} {copiedLabel} />{/if}
</section>
