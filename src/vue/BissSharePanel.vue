<script setup lang="ts">
import { ref } from 'vue';
import BissSelectPicker from './BissSelectPicker.vue';
import BissAccessList from './BissAccessList.vue';
import BissCopyField from './BissCopyField.vue';
import type { BissAccessEntry, BissPickOption } from '../core/types';
const {
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
} = defineProps<{
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
}>();
const emit = defineEmits<{
  invite: [value: { email: string; role: string }];
  role: [value: { id: string; role: string }];
  remove: [id: string];
}>();
const email = ref('');
const role = ref('');
function invite() {
  if (!busy && email.value.trim())
    emit('invite', { email: email.value.trim(), role: role.value || roles[0]?.value || '' });
}
</script>
<template>
  <section class="biss-share-panel" :aria-label="label">
    <h3>{{ label }}</h3>
    <form @submit.prevent="invite">
      <input
        class="biss-input"
        type="email"
        required
        v-model="email"
        :aria-label="emailLabel"
        :placeholder="emailLabel"
        :disabled="busy"
      /><BissSelectPicker
        :label="roleLabel"
        :value="role || roles[0]?.value || ''"
        :options="roles"
        :disabled="busy"
        @change="role = $event"
      /><button type="submit" class="biss-button" :disabled="busy || !email.trim()">
        {{ inviteLabel }}
      </button>
    </form>
    <p v-if="error" class="biss-field-error" role="alert">{{ error }}</p>
    <BissAccessList
      v-bind="accessLabels"
      :entries="entries"
      :roles="roles"
      @role="emit('role', $event)"
      @remove="emit('remove', $event)"
    /><BissCopyField
      v-if="link"
      :value="link"
      :label="linkLabel"
      :copy-label="copyLabel"
      :copied-label="copiedLabel"
    />
  </section>
</template>
