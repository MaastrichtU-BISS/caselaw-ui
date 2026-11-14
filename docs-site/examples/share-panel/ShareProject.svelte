<script lang="ts">
  import { BissSharePanel, type BissAccessEntry, type BissPickOption } from 'biss-ui/svelte';

  const roles: BissPickOption[] = [
    { value: 'viewer', label: 'Can view' },
    { value: 'editor', label: 'Can edit' },
    { value: 'owner', label: 'Owner' },
  ];

  let entries = $state<BissAccessEntry[]>([
    { id: 'u1', name: 'Lena Vos', email: 'l.vos@maastrichtuniversity.nl', role: 'owner' },
    { id: 'u2', name: 'Tom Jansen', email: 't.jansen@maastrichtuniversity.nl', role: 'editor', editable: true },
    { id: 'g1', name: 'Law & Tech group', role: 'viewer', inherited: true },
  ]);
  let busy = $state(false);
  let error = $state<string>();

  async function invite({ email, role }: { email: string; role: string }) {
    error = undefined;
    if (entries.some((entry) => entry.email === email)) {
      error = `${email} already has access.`;
      return;
    }
    busy = true;
    await new Promise((resolve) => setTimeout(resolve, 800)); // Your request goes here.
    busy = false;
    entries = [...entries, { id: email, name: email.split('@')[0]!, email, role, editable: true }];
  }

  function changeRole({ id, role }: { id: string; role: string }) {
    entries = entries.map((entry) => (entry.id === id ? { ...entry, role } : entry));
  }

  function remove(id: string) {
    entries = entries.filter((entry) => entry.id !== id);
  }
</script>

<BissSharePanel
  label="Share “Court reasoning at scale”"
  {entries}
  {roles}
  {busy}
  {error}
  link="https://research.example.org/projects/court-reasoning"
  oninvite={invite}
  onrole={changeRole}
  onremove={remove}
/>
