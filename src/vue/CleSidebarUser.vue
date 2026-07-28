<script setup lang="ts">
/**
 * Who is signed in, shown at the foot of a console sidebar.
 *
 * A menu, since the row grew past the two actions that fitted on it. The email
 * was doing the identifying and it is the thing that truncates: nobody is
 * "david.wicker@maastrichtunive...". The name goes on the row, the address
 * moves into the menu where it has room to be read, and account and sign-out
 * become labelled items rather than an icon a person has to guess at.
 */
import { computed, onBeforeUnmount, ref, Teleport } from "vue";
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
const open = ref(false);
const trigger = ref<HTMLElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const position = ref({ left: 0, bottom: 0, width: 0 });

function place() {
  const node = trigger.value;
  if (!node) return;
  const rect = node.getBoundingClientRect();
  // Anchored to the trigger and measured from the bottom of the viewport,
  // because this widget sits at the foot of a sidebar and the menu opens
  // upward from it.
  position.value = {
    left: rect.left,
    bottom: window.innerHeight - rect.top + 6,
    width: Math.max(rect.width, 208),
  };
}

function onPointerDown(event: PointerEvent) {
  if (!open.value) return;
  const target = event.target as Node;
  if (menu.value?.contains(target) || trigger.value?.contains(target)) return;
  open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (open.value && event.key === "Escape") {
    event.stopPropagation();
    open.value = false;
    trigger.value?.focus();
  }
}

function onResize() {
  if (open.value) place();
}

function toggle() {
  open.value = !open.value;
  if (open.value) {
    place();
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("resize", onResize);
  }
}

onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", onPointerDown);
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("resize", onResize);
});

function requestSignOut() {
  open.value = false;
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
    <button
      ref="trigger"
      type="button"
      class="cle-sidebar-user-identity is-menu"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
    >
      <span class="cle-sidebar-user-avatar" aria-hidden="true">{{ derived }}</span>
      <span class="cle-sidebar-user-text">
        <!-- The name, not the address. The address is in the menu. -->
        <span class="cle-sidebar-user-name">{{ name }}</span>
      </span>
      <svg
        class="cle-sidebar-user-chevron"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Out to <body>, for the same reason the modal goes there: a sidebar is
         a scroll container with its own stacking context, and a menu opening
         upward out of its last row is clipped by both. -->
    <Teleport to="body">
      <div
        v-if="open"
        ref="menu"
        class="cle-user-menu"
        role="menu"
        tabindex="-1"
        :style="{
          left: position.left + 'px',
          bottom: position.bottom + 'px',
          minWidth: position.width + 'px',
        }"
      >
        <p v-if="email" class="cle-user-menu-email" :title="email">{{ email }}</p>

        <a
          v-if="accountHref"
          class="cle-user-menu-item"
          role="menuitem"
          :href="accountHref"
          @click="open = false"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {{ accountLabel || "Your account" }}
        </a>

        <slot name="menu" />

        <template v-if="signOut">
          <hr v-if="accountHref || $slots.menu" class="cle-user-menu-separator" />
          <button type="button" class="cle-user-menu-item is-danger" role="menuitem" @click="requestSignOut">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {{ signOutLabel }}
          </button>
        </template>
      </div>
    </Teleport>

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
