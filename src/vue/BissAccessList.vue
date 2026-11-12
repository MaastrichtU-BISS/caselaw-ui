<script setup lang="ts">
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import BissAvatar from './BissAvatar.vue';
import BissSelectPicker from './BissSelectPicker.vue';
import type { BissAccessEntry, BissPickOption } from '../core/types';
const {
  roleLabel = 'Role: {name}',

  entries,
  roles,
  label = 'Who has access',
  inheritedLabel = 'From workspace',
  removeLabel = 'Remove access',
} = defineProps<{
  roleLabel?: string;

  entries: BissAccessEntry[];
  roles: BissPickOption[];
  label?: string;
  inheritedLabel?: string;
  removeLabel?: string;
}>();
const emit = defineEmits<{ role: [value: { id: string; role: string }]; remove: [id: string] }>();
</script>
<template>
  <section class="biss-access-list" :aria-label="label">
    <h3>{{ label }}</h3>
    <div v-for="entry in entries" :key="entry.id" class="biss-access-row">
      <BissAvatar :name="entry.name" :size="28" />
      <div class="biss-grow">
        <b>{{ entry.name }}</b><small>{{ entry.email }}</small
        ><small v-if="entry.inherited">{{ inheritedLabel }}</small>
      </div>
      <BissSelectPicker
        v-if="entry.editable && !entry.inherited"
        :label="roleLabel.replace('{name}', entry.name)"
        :value="entry.role"
        :options="roles"
        @change="emit('role', { id: entry.id, role: $event })"
      /><span v-else class="biss-access-role">{{
        roles.find((r) => r.value === entry.role)?.label ?? entry.role
      }}</span
      ><button
        v-if="entry.editable && !entry.inherited"
        type="button"
        class="biss-header-action"
        :aria-label="removeLabel + ' ' + entry.name"
        @click="emit('remove', entry.id)"
      >
        <BissIcon name="x" />
      </button>
    </div>
  </section>
</template>
