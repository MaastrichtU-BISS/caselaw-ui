<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{
  placeholder?: string;
  disabled?: boolean;
  suggestions?: string[];
  /** Separators that commit the current draft. Comma and Enter are always active. */
  allowSpaces?: boolean;
}>(), {
  disabled: false,
  allowSpaces: false,
});

const model = defineModel<string[]>({ default: () => [] });

const draft = ref("");
const field = ref<HTMLInputElement | null>(null);

const openSuggestions = computed(() =>
  (props.suggestions || []).filter((item) => !model.value.includes(item)),
);

function commit() {
  const parts = draft.value
    .split(props.allowSpaces ? /[,\n]/ : /[\s,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (parts.length) {
    const next = [...model.value];
    for (const part of parts) {
      if (!next.includes(part)) next.push(part);
    }
    model.value = next;
  }
  draft.value = "";
}

function add(value: string) {
  if (!model.value.includes(value)) model.value = [...model.value, value];
}

function remove(value: string) {
  model.value = model.value.filter((item) => item !== value);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === "," || (props.allowSpaces === false && event.key === " ")) {
    event.preventDefault();
    commit();
    return;
  }
  if (event.key === "Backspace" && !draft.value && model.value.length) {
    model.value = model.value.slice(0, -1);
  }
}
</script>

<template>
  <div>
    <div class="cle-tag-input" @click="field?.focus()">
      <span v-for="tag in model" :key="tag" class="cle-tag">
        {{ tag }}
        <button
          v-if="!disabled"
          type="button"
          class="cle-tag-remove"
          :aria-label="`Remove ${tag}`"
          @click.stop="remove(tag)"
        >&times;</button>
      </span>
      <input
        ref="field"
        v-model="draft"
        class="cle-tag-input-field"
        :placeholder="model.length ? '' : placeholder"
        :disabled="disabled"
        @keydown="onKeydown"
        @blur="commit"
      >
    </div>
    <div v-if="openSuggestions.length && !disabled" class="cle-tag-suggestions">
      <button
        v-for="suggestion in openSuggestions"
        :key="suggestion"
        type="button"
        class="cle-tag-suggestion"
        @click="add(suggestion)"
      >+ {{ suggestion }}</button>
    </div>
  </div>
</template>
