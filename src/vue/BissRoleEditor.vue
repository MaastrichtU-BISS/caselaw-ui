<script setup lang="ts">
import BissCheckbox from './BissCheckbox.vue';
import type { BissPermission } from '../core/types';
import { toggleValue } from '../core/format';
const {
  permissions,
  selected = [],
  label = 'Role permissions',
  readonly = false,
} = defineProps<{
  permissions: BissPermission[];
  selected?: string[];
  label?: string;
  readonly?: boolean;
}>();
const emit = defineEmits<{ change: [permissions: string[]] }>();
</script>
<template>
  <section class="biss-role-editor" :aria-label="label">
    <h3>{{ label }}</h3>
    <template v-for="(permission, i) in permissions" :key="permission.key"
      ><h4 v-if="permission.group && permission.group !== permissions[i - 1]?.group">
        {{ permission.group }}
      </h4>
      <BissCheckbox
        :label="permission.label"
        :description="permission.description"
        :checked="selected.includes(permission.key)"
        :disabled="readonly || permission.disabled"
        @change="emit('change', toggleValue(selected, permission.key))"
    /></template>
  </section>
</template>
