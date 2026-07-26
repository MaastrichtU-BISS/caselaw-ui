<script setup lang="ts">
/**
 * Who is signed in, shown at the foot of a console sidebar.
 *
 * Deliberately not a dropdown. A console sidebar is already a click target for
 * navigation, and hiding one or two actions behind a menu costs a click to
 * save nothing — they fit on the row itself, trailing the name.
 */
import { computed } from "vue";

const props = withDefaults(defineProps<{
  name: string;
  email?: string;
  /** Two letters at most. Derived from the name when not given. */
  initials?: string;
}>(), {});

const derived = computed(() => {
  if (props.initials) return props.initials.slice(0, 2).toUpperCase();
  const source = (props.name || props.email || "").trim();
  if (!source) return "?";
  // "Ada Lovelace" -> AL, but "ada@example.org" -> AD, because splitting an
  // address on spaces yields one very long "word".
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length > 1) return (words[0]![0]! + words[1]![0]!).toUpperCase();
  return source.slice(0, 2).toUpperCase();
});
</script>

<template>
  <div class="cle-sidebar-user">
    <span class="cle-sidebar-user-avatar" aria-hidden="true">{{ derived }}</span>
    <span class="cle-sidebar-user-text">
      <span class="cle-sidebar-user-name">{{ name }}</span>
      <span v-if="email && email !== name" class="cle-sidebar-user-email">{{ email }}</span>
    </span>
    <span v-if="$slots.actions" class="cle-sidebar-user-actions">
      <slot name="actions" />
    </span>
  </div>
</template>
