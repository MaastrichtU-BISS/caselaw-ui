<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { floatPanel, closePopover } from '../core/dom';
import BissIcon from './BissIcon.vue';
import type { BissIconName } from '../core/icon-names';
import type { BissPickOption } from '../core/types';
import { actionDirective } from './actions';
const {
  label,
  options,
  value = '',
  placeholder = 'Choose…',
  searchable = true,
  searchLabel = 'Search options',
  emptyLabel = 'No matching options',
  disabled = false,
  width = 280,
} = defineProps<{
  label: string;
  options: BissPickOption[];
  value?: string;
  placeholder?: string;
  searchable?: boolean;
  searchLabel?: string;
  emptyLabel?: string;
  disabled?: boolean;
  width?: number;
}>();
const emit = defineEmits<{ change: [value: string] }>();
const vFloat = actionDirective(floatPanel);
const uid = useId();
const panel = ref<HTMLElement | null>(null);
const query = ref('');
const shown = computed(() =>
  options.filter((o) => o.label.toLowerCase().includes(query.value.toLowerCase())),
);
</script>
<template>
  <span class="biss-floating-trigger"
    ><button
      :id="uid + '-anchor'"
      type="button"
      class="biss-picker-trigger"
      :popovertarget="uid"
      :disabled="disabled"
      :aria-label="label"
      aria-haspopup="dialog"
    >
      {{ options.find((o) => o.value === value)?.label ?? placeholder
      }}<BissIcon name="chev" /></button
  ></span>
  <div
    :id="uid"
    ref="panel"
    popover="auto"
    class="biss-floating"
    role="group"
    :aria-label="label"
    tabindex="-1"
    v-float="{ anchorId: uid + '-anchor', width }"
  >
    <input
      v-if="searchable"
      class="biss-picker-search"
      v-model="query"
      :aria-label="searchLabel"
      :placeholder="searchLabel"
    />
    <div role="listbox" :aria-label="label">
      <template v-for="(option, i) in shown" :key="option.value"
        ><p
          v-if="option.group && option.group !== shown[i - 1]?.group"
          class="biss-picker-option-group"
        >
          {{ option.group }}
        </p>
        <button
          type="button"
          role="option"
          class="biss-picker-option"
          data-choice
          :aria-selected="value === option.value"
          :disabled="option.disabled"
          @click="
            emit('change', option.value);
            closePopover(panel);
          "
        >
          <span class="biss-grow"
            >{{ option.label
            }}<small v-if="option.description">{{ option.description }}</small></span
          ><BissIcon v-if="value === option.value" name="check" /></button
      ></template>
      <p v-if="!shown.length" class="biss-picker-empty">{{ emptyLabel }}</p>
    </div>
  </div>
</template>
