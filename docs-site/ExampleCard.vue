<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BissIcon } from '../src/vue';
import { highlight } from '../src/core/highlight';
import { exampleSource, type ExampleMeta } from './examples/registry';

/** One authored example: the compiled file in a frame, and that file's exact source. */
const props = defineProps<{
  slug: string;
  example: ExampleMeta;
  framework: 'vue' | 'svelte';
  density: string;
  theme: string;
  /** The first example on a page doubles as the page's preview. */
  lead?: boolean;
}>();

const showCode = ref(false),
  copied = ref(false),
  reset = ref(0),
  viewport = ref<'desktop' | 'phone'>('desktop'),
  height = ref(props.example.height ?? 200);

const code = computed(() => exampleSource(props.slug, props.example.file, props.framework));
const tokens = computed(() => highlight(code.value, 'ts'));
const fileName = computed(
  () => `${props.example.file}.${props.framework === 'vue' ? 'vue' : 'svelte'}`,
);
const url = computed(
  () =>
    `./preview.html?example=${props.slug}/${props.example.id}&framework=${props.framework}&density=${props.density}&theme=${props.theme}`,
);

watch(
  () => props.framework,
  () => (copied.value = false),
);

const frame = ref<HTMLIFrameElement>();
function onMessage(event: MessageEvent) {
  if (event.origin !== location.origin || event.source !== frame.value?.contentWindow) return;
  const data = event.data as { type?: string; height?: number };
  if (data?.type !== 'biss-example-height' || typeof data.height !== 'number') return;
  height.value = Math.max(props.example.height ?? 140, Math.min(960, Math.ceil(data.height)));
}
onMounted(() => window.addEventListener('message', onMessage));
onBeforeUnmount(() => window.removeEventListener('message', onMessage));

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
  } catch {
    copied.value = false;
  }
}
</script>

<template>
  <article class="example-card" :class="{ 'is-lead': lead }" :aria-labelledby="`ex-${slug}-${example.id}`">
    <header v-if="!lead" class="example-card-head">
      <h3 :id="`ex-${slug}-${example.id}`">{{ example.title }}</h3>
      <p>{{ example.description }}</p>
    </header>
    <h3 v-else :id="`ex-${slug}-${example.id}`" class="biss-visually-hidden">{{ example.title }}</h3>
    <div class="example-card-frame">
      <div class="example-card-toolbar">
        <div class="segmented" role="group" :aria-label="`${example.title}: view`">
          <button type="button" :aria-pressed="!showCode" @click="showCode = false">
            Preview
          </button>
          <button type="button" :aria-pressed="showCode" @click="showCode = true">Code</button>
        </div>
        <div class="example-card-tools">
          <template v-if="!showCode">
            <div class="segmented viewport-picker" role="group" :aria-label="`${example.title}: viewport`">
              <button type="button" :aria-pressed="viewport === 'desktop'" @click="viewport = 'desktop'">
                Desktop
              </button>
              <button type="button" :aria-pressed="viewport === 'phone'" @click="viewport = 'phone'">
                Phone
              </button>
            </div>
            <button
              type="button"
              class="example-icon-button"
              :aria-label="`Reset ${example.title}`"
              title="Reset example"
              @click="reset++"
            >
              <BissIcon name="refresh" />
            </button>
            <a
              class="example-icon-button"
              :href="url"
              target="_blank"
              rel="noopener"
              :aria-label="`Open ${example.title} in a new tab`"
              title="Open in a new tab"
              ><BissIcon name="expand"
            /></a>
          </template>
          <button v-else type="button" class="example-copy" @click="copy">
            {{ copied ? 'Copied' : 'Copy code' }}
          </button>
        </div>
      </div>
      <div v-show="!showCode" class="example-card-canvas" :class="{ 'is-phone': viewport === 'phone' }">
        <iframe
          :key="url + reset"
          :src="url"
          loading="lazy"
          :title="`${example.title}, ${framework === 'vue' ? 'Vue' : 'Svelte'} example`"
          ref="frame"
          :style="{ height: height + 'px' }"
        />
      </div>
      <div v-if="showCode" class="example-card-code">
        <pre
          tabindex="0"
          :aria-label="`${example.title} source`"
        ><code><span v-for="(token, index) in tokens" :key="index" :class="'biss-tok-' + token.kind">{{ token.text }}</span></code></pre>
      </div>
      <footer class="example-card-file">
        <span><i aria-hidden="true" />{{ fileName }}</span>
        <span>The preview runs this file</span>
      </footer>
    </div>
    <p v-if="lead" class="example-card-caption">{{ example.description }}</p>
  </article>
</template>
