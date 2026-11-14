<script setup lang="ts">
import { ref } from 'vue';
import { BissSharePanel, type BissAccessEntry, type BissPickOption } from 'biss-ui/vue';

const roles: BissPickOption[] = [
  { value: 'viewer', label: 'Can view' },
  { value: 'reviewer', label: 'Can comment' },
];

const entries = ref<BissAccessEntry[]>([
  { id: 'u1', name: 'Aisha Bakker', email: 'a.bakker@maastrichtuniversity.nl', role: 'reviewer' },
  { id: 'g1', name: 'Ethics committee', role: 'viewer', inherited: true },
]);
const error = ref<string>();

function invite({ email, role }: { email: string; role: string }) {
  if (!email.endsWith('@maastrichtuniversity.nl')) {
    error.value = 'Ethics protocols can only be shared with university addresses.';
    return;
  }
  error.value = undefined;
  entries.value = [...entries.value, { id: email, name: email.split('@')[0]!, email, role }];
}
</script>

<template>
  <BissSharePanel
    label="Share the ethics protocol"
    :entries="entries"
    :roles="roles"
    :error="error"
    @invite="invite"
  />
</template>
