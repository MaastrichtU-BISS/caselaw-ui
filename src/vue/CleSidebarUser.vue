<script setup lang="ts">
/**
 * Who is signed in, shown at the foot of a console sidebar.
 *
 * Deliberately not a dropdown. A console sidebar is already a click target for
 * navigation, and hiding one or two actions behind a menu costs a click to
 * save nothing — they fit on the row itself, trailing the name.
 */
import { computed, ref } from "vue";
import CleConfirmDialog from "./CleConfirmDialog.vue";

const props = withDefaults(defineProps<{
  name: string;
  email?: string;
  /** Two letters at most. Derived from the name when not given. */
  initials?: string;
  /**
   * Where the account lives. Set it and the identity becomes a link.
   *
   * The block already names who you are, which makes it the thing people
   * reach for when they want to do something about that, and until now it
   * did nothing when clicked. Every console shows this widget, so pointing
   * it at one account page is what stops each product growing its own.
   */
  accountHref?: string;
  accountLabel?: string;
  /** Render the sign-out control. */
  signOut?: boolean;
  signOutLabel?: string;
  /**
   * Skip the confirmation. Off by default: signing out is one small click
   * away from every navigation target in the sidebar, and the cost of an
   * accidental one is re-authenticating.
   */
  confirmSignOut?: boolean;
  signOutTitle?: string;
  signOutCopy?: string;
  /** Disables the dialog's buttons while the sign-out is in flight. */
  busy?: boolean;
}>(), {
  signOut: false,
  signOutLabel: "Sign out",
  confirmSignOut: true,
  signOutTitle: "Sign out?",
  busy: false,
});

const emit = defineEmits<{ signOut: [] }>();
const confirming = ref(false);

function requestSignOut() {
  if (props.confirmSignOut) {
    confirming.value = true;
    return;
  }
  emit("signOut");
}

function confirmed() {
  confirming.value = false;
  emit("signOut");
}

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
    <component
      :is="accountHref ? 'a' : 'span'"
      v-bind="accountHref ? { href: accountHref, title: accountLabel || 'Your account' } : {}"
      class="cle-sidebar-user-identity"
      :class="{ 'is-linked': Boolean(accountHref) }"
    >
      <span class="cle-sidebar-user-avatar" aria-hidden="true">{{ derived }}</span>
      <span class="cle-sidebar-user-text">
        <span class="cle-sidebar-user-name">{{ name }}</span>
        <span v-if="email && email !== name" class="cle-sidebar-user-email">{{ email }}</span>
      </span>
    </component>
    <span v-if="$slots.actions || signOut" class="cle-sidebar-user-actions">
      <slot name="actions" />
      <button
        v-if="signOut"
        type="button"
        class="cle-icon-button cle-icon-button-danger"
        :title="signOutLabel"
        :aria-label="signOutLabel"
        @click="requestSignOut"
      >
        <!-- Inlined rather than slotted: a sign-out control that needs the
             caller to supply its own glyph is not a component, it is a
             convention nobody follows twice the same way. -->
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </span>

    <CleConfirmDialog
      v-if="signOut && confirmSignOut"
      v-model="confirming"
      :title="signOutTitle"
      :confirm-label="signOutLabel"
      :busy="busy"
      @confirm="confirmed"
    >
      <p class="cle-modal-copy">
        {{ signOutCopy || `${name} will be signed out of every Case Law Explorer console sharing this account.` }}
      </p>
    </CleConfirmDialog>
  </div>
</template>
