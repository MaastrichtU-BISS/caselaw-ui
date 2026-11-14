<script lang="ts">
  import { BissSharePanel, type BissAccessEntry, type BissPickOption } from 'biss-ui/svelte';

  const roles: BissPickOption[] = [
    { value: 'viewer', label: 'Can view' },
    { value: 'reviewer', label: 'Can comment' },
  ];

  let entries = $state<BissAccessEntry[]>([
    { id: 'u1', name: 'Aisha Bakker', email: 'a.bakker@maastrichtuniversity.nl', role: 'reviewer' },
    { id: 'g1', name: 'Ethics committee', role: 'viewer', inherited: true },
  ]);
  let error = $state<string>();

  function invite({ email, role }: { email: string; role: string }) {
    if (!email.endsWith('@maastrichtuniversity.nl')) {
      error = 'Ethics protocols can only be shared with university addresses.';
      return;
    }
    error = undefined;
    entries = [...entries, { id: email, name: email.split('@')[0]!, email, role }];
  }
</script>

<BissSharePanel label="Share the ethics protocol" {entries} {roles} {error} oninvite={invite} />
