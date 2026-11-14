<script setup lang="ts">
import { ref } from 'vue';
import { BissSharePanel, type BissAccessEntry, type BissPickOption } from 'biss-ui/vue';

const roles: BissPickOption[] = [
  { value: 'viewer', label: 'Can view' },
  { value: 'editor', label: 'Can edit' },
  { value: 'owner', label: 'Owner' },
];

const entries = ref<BissAccessEntry[]>([
  { id: 'u1', name: 'Lena Vos', email: 'l.vos@maastrichtuniversity.nl', role: 'owner' },
  { id: 'u2', name: 'Tom Jansen', email: 't.jansen@maastrichtuniversity.nl', role: 'editor', editable: true },
  { id: 'g1', name: 'Law & Tech group', role: 'viewer', inherited: true },
]);
const busy = ref(false);
const error = ref<string>();

async function invite({ email, role }: { email: string; role: string }) {
  error.value = undefined;
  if (entries.value.some((entry) => entry.email === email)) {
    error.value = `${email} already has access.`;
    return;
  }
  busy.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800)); // Your request goes here.
  busy.value = false;
  entries.value = [...entries.value, { id: email, name: email.split('@')[0]!, email, role, editable: true }];
}

function changeRole({ id, role }: { id: string; role: string }) {
  entries.value = entries.value.map((entry) => (entry.id === id ? { ...entry, role } : entry));
}

function remove(id: string) {
  entries.value = entries.value.filter((entry) => entry.id !== id);
}
</script>

<template>
  <BissSharePanel
    label="Share “Court reasoning at scale”"
    :entries="entries"
    :roles="roles"
    :busy="busy"
    :error="error"
    link="https://research.example.org/projects/court-reasoning"
    @invite="invite"
    @role="changeRole"
    @remove="remove"
  />
</template>
