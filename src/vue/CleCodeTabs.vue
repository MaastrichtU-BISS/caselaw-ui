<script setup lang="ts">
/**
 * The same instruction in several languages.
 *
 * One component rather than tabs-plus-code assembled per page, because the
 * pairing is always the same and getting it wrong — copy that copies the
 * inactive sample, tabs that do not survive a re-render — is easy and quiet.
 */
import { computed, ref } from "vue";
import { highlight, inferLanguage } from "../highlight";
import type { CleCodeSample } from "../types";


const props = defineProps<{ samples: CleCodeSample[] }>();

/**
 * Optional, so a page showing the same choice in several blocks — install
 * here, guard there — can keep them in step. Picking a language twice to read
 * one set of instructions is the kind of small friction documentation is
 * supposed to remove.
 */
const activeIndex = defineModel<number>("activeIndex", { default: 0 });
const active = computed(() => props.samples[activeIndex.value] || props.samples[0]);
const tokens = computed(() => {
  const sample = active.value;
  if (!sample) return [];
  return highlight(sample.code, inferLanguage(sample.code, sample.language ?? sample.label));
});

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    // Reads through `active`, so it can never copy a sample that is not shown.
    await navigator.clipboard.writeText(active.value?.code || "");
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1800);
}
</script>

<template>
  <div class="cle-code">
    <div class="cle-code-header">
      <div class="cle-code-tablist" role="tablist">
        <button
          v-for="(sample, index) in samples"
          :key="sample.label"
          type="button"
          role="tab"
          class="cle-code-tab"
          :class="{ 'is-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          @click="activeIndex = index"
        >
          {{ sample.label }}
        </button>
      </div>
      <button type="button" class="cle-code-copy" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <pre class="cle-code-body"><span
      v-for="(token, index) in tokens"
      :key="index"
      :class="`cle-tok-${token.kind}`"
    >{{ token.text }}</span></pre>
  </div>
</template>
