<script setup lang="ts">
import { computed, ref } from 'vue';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import BissDialog from './BissDialog.vue';
import type { BissSearchItem } from '../core/types';
import { listKeys } from '../core/dom';
const {
  open = false,
  label = 'Search',
  items,
  placeholder = 'Search…',
  emptyLabel = 'No results',
  loading = false,
  loadingLabel = 'Searching…',
} = defineProps<{
  open?: boolean;
  label?: string;
  items: BissSearchItem[];
  placeholder?: string;
  emptyLabel?: string;
  loading?: boolean;
  loadingLabel?: string;
}>();
const emit = defineEmits<{ close: []; query: [value: string]; pick: [item: BissSearchItem] }>();
const query = ref('');
const root = ref<HTMLElement | null>(null);
const shown = computed(() =>
  items.filter((i) =>
    (i.label + ' ' + (i.description ?? '')).toLowerCase().includes(query.value.toLowerCase()),
  ),
);
</script>
<template>
  <BissDialog :open="open" :title="label" @close="emit('close')"
    ><div ref="root" @keydown="listKeys($event, root)">
      <input
        class="biss-picker-search"
        v-model="query"
        :aria-label="label"
        :placeholder="placeholder"
        autofocus
        @input="emit('query', query)"
      />
      <p v-if="loading" role="status">{{ loadingLabel }}</p>
      <div v-else class="biss-picker-option-scroll">
        <template v-for="(item, i) in shown" :key="item.key"
          ><p
            v-if="item.group && item.group !== shown[i - 1]?.group"
            class="biss-picker-option-group"
          >
            {{ item.group }}
          </p>
          <button
            type="button"
            class="biss-picker-option"
            data-choice
            :disabled="item.disabled"
            @click="emit('pick', item)"
          >
            <BissIcon v-if="item.icon" :name="item.icon" /><span
              >{{ item.label }}<small v-if="item.description">{{ item.description }}</small></span
            >
          </button></template
        >
        <p v-if="!shown.length">{{ emptyLabel }}</p>
      </div>
    </div></BissDialog
  >
</template>
