<script setup lang="ts">
/**
 * The current workspace, with a popover to switch to another, find one by name or
 * create a new one. The host owns the workspaces and what switching does (usually
 * a reload): picking emits `select`, the create row emits `create`.
 */
import { computed, nextTick, ref } from 'vue';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';
import BissIcon from './BissIcon.vue';
import BissCommandMenu from './BissCommandMenu.vue';
import { initials } from '../core/format';
import { workspaceCommands, type BissCommand, type BissWorkspace } from '../core/commands';

const props = withDefaults(
  defineProps<{
    workspaces: BissWorkspace[];
    /** Id of the workspace this page works in. */
    current?: string;
    /** Icon-only trigger, for a collapsed sidebar rail. */
    collapsed?: boolean;
    /** Show the search field when there are more workspaces than this. */
    searchThreshold?: number;
    /** Show the create action. */
    canCreate?: boolean;
    label?: string;
    heading?: string;
    searchLabel?: string;
    emptyLabel?: string;
    createLabel?: string;
    currentLabel?: string;
    /** Trigger text when no workspace matches `current`. */
    placeholder?: string;
    width?: number;
    align?: 'start' | 'center' | 'end';
    portal?: boolean;
  }>(),
  {
    collapsed: false,
    searchThreshold: 6,
    canCreate: true,
    label: 'Switch workspace',
    heading: 'Your workspaces',
    searchLabel: 'Find a workspace',
    emptyLabel: 'No workspace matches “{query}”',
    createLabel: 'New workspace',
    currentLabel: 'Current workspace',
    placeholder: 'Choose a workspace',
    width: 260,
    align: 'start',
    portal: false,
  },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ select: [workspace: BissWorkspace]; create: [] }>();

const query = ref('');
const menu = ref<InstanceType<typeof BissCommandMenu> | null>(null);
const active = computed(() => props.workspaces.find((w) => w.id === props.current));
const commands = computed(() => workspaceCommands(props.workspaces, props.current));
const searchable = computed(() => props.workspaces.length > props.searchThreshold);
const byId = (id: string) => props.workspaces.find((w) => w.id === id);
const mark = (name?: string) => initials(name ?? '').slice(0, 1) || '?';

function focusMenu(event: Event) {
  event.preventDefault();
  query.value = '';
  nextTick(() => menu.value?.focus());
}
function pick(command: BissCommand) {
  const workspace = byId(command.key);
  open.value = false;
  if (workspace && workspace.id !== props.current) emit('select', workspace);
}
function create() {
  open.value = false;
  emit('create');
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      class="biss-workspace-trigger"
      :data-collapsed="collapsed || undefined"
      :data-open="open || undefined"
      :aria-label="`${label}: ${active?.name ?? placeholder}`"
      :title="collapsed ? active?.name : undefined"
    >
      <span class="biss-workspace-mark" aria-hidden="true"
        ><img v-if="active?.logo" :src="active.logo" alt="" /><template v-else>{{
          mark(active?.name)
        }}</template></span
      >
      <span v-if="!collapsed" class="biss-workspace-name"
        ><span>{{ active?.name ?? placeholder }}</span
        ><small v-if="active?.detail">{{ active.detail }}</small></span
      >
      <BissIcon v-if="!collapsed" name="chev" class="biss-workspace-chev" />
    </PopoverTrigger>
    <PopoverPortal :disabled="!portal">
      <PopoverContent
        class="biss-block-popover biss-workspace-panel"
        :align="align"
        :side-offset="6"
        :collision-padding="8"
        :aria-label="label"
        :style="{ width: width + 'px' }"
        @open-auto-focus="focusMenu"
      >
        <p v-if="!searchable" class="biss-workspace-heading" aria-hidden="true">{{ heading }}</p>
        <BissCommandMenu
          ref="menu"
          v-model:query="query"
          :items="commands"
          :label="heading"
          :searchable="searchable"
          :search-label="searchLabel"
          :empty-label="emptyLabel"
          :checked-label="currentLabel"
          :grouped="false"
          :hint="false"
          @pick="pick"
          @close="open = false"
          ><template #leading="{ item }"
            ><span class="biss-workspace-mark" aria-hidden="true"
              ><img v-if="byId(item.key)?.logo" :src="byId(item.key)?.logo" alt="" /><template
                v-else
                >{{ mark(item.label) }}</template
              ></span
            ></template
          ></BissCommandMenu
        >
        <button v-if="canCreate" type="button" class="biss-workspace-create" @click="create">
          <BissIcon name="plus" />{{ createLabel }}
        </button>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
