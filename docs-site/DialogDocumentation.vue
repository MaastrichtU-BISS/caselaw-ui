<script setup lang="ts">
import { computed, ref } from 'vue';
import { dialogExamples } from './examples/dialog/manifest';
const props = defineProps<{ framework: 'vue' | 'svelte' }>();
const source = import.meta.glob('./examples/dialog/*.{vue,svelte}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;
const active = ref('basic'),
  showCode = ref(false),
  copied = ref(false),
  reset = ref(0);
const current = computed(() => dialogExamples.find((example) => example.id === active.value)!);
const code = computed(
  () => source[`./examples/dialog/${current.value.file}.${props.framework}`] ?? '',
);
const url = computed(
  () => `./preview.html?example=${current.value.id}&framework=${props.framework}`,
);
const install = computed(() =>
  props.framework === 'vue'
    ? 'npm install biss-ui vue reka-ui'
    : 'npm install biss-ui svelte bits-ui',
);
const anatomy = computed(() =>
  props.framework === 'vue'
    ? '<Dialog.Root>\n  <Dialog.Trigger as-child><BissButton>Open</BissButton></Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Overlay />\n    <Dialog.Content>\n      <Dialog.Title>Title</Dialog.Title>\n      <Dialog.Description>Context</Dialog.Description>\n      <Dialog.Close>Close</Dialog.Close>\n    </Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>'
    : '<Dialog.Root>\n  <Dialog.Trigger>Open</Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Overlay />\n    <Dialog.Content>\n      <Dialog.Title>Title</Dialog.Title>\n      <Dialog.Description>Context</Dialog.Description>\n      <Dialog.Close>Close</Dialog.Close>\n    </Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>',
);
async function copy() {
  await navigator.clipboard.writeText(code.value);
  copied.value = true;
}
const parts = [
  ['Root', 'Owns open state and connects the parts.', 'open, defaultOpen (Vue), modal (Vue)'],
  [
    'Trigger',
    'Opens the dialog; composes with a host button.',
    'asChild (Vue), child snippet (Svelte), disabled',
  ],
  ['Portal', 'Moves the overlay and content to a destination.', 'to, disabled'],
  ['Overlay', 'Dims the background.', 'class, forceMount'],
  [
    'Content',
    'Positions content and manages focus and dismissal.',
    'size: sm | md | lg, width, class',
  ],
  ['Title', 'Provides the accessible name.', 'as (Vue), level (Svelte), class'],
  ['Description', 'Provides supporting accessible context.', 'class'],
  [
    'Close',
    'Closes through the same root state.',
    'asChild (Vue), child snippet (Svelte), disabled',
  ],
];
</script>
<template>
  <section id="preview" class="docs-section">
    <h2>Try Dialog</h2>
    <p>
      A dialog is a connected set of parts. Start with the common composition, then explore
      controlled forms, nested layers or the convenient wrapper.
    </p>
    <div class="dialog-docs-example">
      <div class="dialog-docs-toolbar">
        <label
          >Example<select
            v-model="active"
            aria-label="Dialog example"
            @change="
              showCode = false;
              copied = false;
            "
          >
            <option v-for="example in dialogExamples" :key="example.id" :value="example.id">
              {{ example.title }}
            </option>
          </select></label
        >
        <div class="segmented" role="group" aria-label="Example view">
          <button type="button" :aria-pressed="!showCode" @click="showCode = false">Preview</button
          ><button type="button" :aria-pressed="showCode" @click="showCode = true">Code</button>
        </div>
        <button type="button" class="biss-button biss-button-ghost biss-button-sm" @click="reset++">
          Reset
        </button>
      </div>
      <p class="dialog-docs-caption">{{ current.description }}</p>
      <iframe
        v-show="!showCode"
        :key="framework + active + reset"
        :src="url"
        :title="`Dialog ${current.title} ${framework} example`"
        class="dialog-docs-frame"
      />
      <div v-if="showCode" class="dialog-docs-code">
        <button
          type="button"
          class="biss-button biss-button-secondary biss-button-sm"
          @click="copy"
        >
          {{ copied ? 'Copied' : 'Copy code' }}
        </button>
        <pre tabindex="0" aria-label="Dialog example source"><code>{{code}}</code></pre>
      </div>
    </div>
    <p class="dialog-docs-source-note">
      The preview runs this exact example file. Vue uses Reka UI; Svelte uses Bits UI. Both use the
      same BISS dialog recipe.
    </p>
  </section>
  <section id="installation" class="docs-section">
    <h2>Installation</h2>
    <pre
      class="guide-code"
      tabindex="0"
      aria-label="Dialog installation"
    ><code>{{install}}</code></pre>
    <p>
      Import <code>biss-ui/styles.css</code> once at your application entry point. Vue requires Vue
      3.5+ and Reka 2.11+. Svelte requires Svelte 5.33+ and Bits 2.21+. The foundation for the other
      framework is optional.
    </p>
  </section>
  <section id="anatomy" class="docs-section">
    <h2>Anatomy and composition</h2>
    <p>
      Root connects the trigger, accessible text and dismissal controls through scoped context.
      Title and Description are semantic parts, not just visual headings.
    </p>
    <pre class="guide-code" tabindex="0" aria-label="Dialog anatomy"><code>{{anatomy}}</code></pre>
    <p v-if="framework === 'vue'">
      Use <code>as-child</code> to put trigger behavior on your BISS button or host component. The
      child must forward attributes and handlers to one focusable element.
    </p>
    <p v-else>
      Use the <code>child</code> snippet and spread its <code>props</code> onto your BISS button or
      host component. Those props include accessibility attributes and merged handlers.
    </p>
    <p>
      Use one Root for each dialog. A nested Root has independent state; portalling its content
      keeps it above the parent layer. Avoid nesting buttons or duplicating trigger IDs.
    </p>
  </section>
  <section id="state" class="docs-section">
    <h2>State and forms</h2>
    <p v-if="framework === 'vue'">
      Omit <code>open</code> for internal state, use <code>default-open</code> for its initial
      value, or bind <code>v-model:open</code> to control it.
    </p>
    <p v-else>
      Omit <code>open</code> for internal state, use <code>open</code> for its initial value, or use
      <code>bind:open</code> and <code>onOpenChange</code> for controlled updates.
    </p>
    <p>
      Use a normal submit button when validation must finish before closing. Keep Close for
      cancellation or actions that can close immediately. The controlled example shows errors
      without dismissing the dialog.
    </p>
    <p>
      <code>BissDialog</code> retains the standard title/body/actions layout and existing close
      callback. It also supports {{ framework === 'vue' ? 'v-model:open' : 'bind:open' }}, size and
      per-part style overrides.
    </p>
  </section>
  <section id="customization" class="docs-section">
    <h2>Customization</h2>
    <p>
      Content supports <code>sm</code> (360px), <code>md</code> (520px) and <code>lg</code> (720px),
      constrained to the viewport. Use <code>width</code> for a custom width, and
      <code>class</code> on an individual part for local styling.
    </p>
    <p>
      The recipe uses semantic surface, border, radius, text and overlay-shadow tokens. Override
      tokens globally, or choose an explicit Portal destination inside a themed subtree. The
      convenient wrapper stays inline by default; set <code>portal</code> to move it to the body.
    </p>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>Part</th>
            <th>Default class</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="part in ['overlay', 'content', 'title', 'description']" :key="part">
            <td>{{ part }}</td>
            <td>
              <code>biss-dialog-{{ part }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Wrapper-only <code>ui</code> keys: overlay, content, header, title, description, body, footer
      and close. State attributes from the primitive remain available for CSS and transitions.
    </p>
  </section>
  <section id="api" class="docs-section">
    <h2>API by part</h2>
    <div class="api-table-wrap">
      <table class="api-table">
        <thead>
          <tr>
            <th>Part</th>
            <th>Role</th>
            <th>Key options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="part in parts" :key="part[0]">
            <td>
              <code>Dialog.{{ part[0] }}</code>
            </td>
            <td>{{ part[1] }}</td>
            <td>{{ part[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      All part types are exported through <code>Dialog.RootProps</code>,
      <code>Dialog.ContentProps</code> and the matching part names. Content forwards the
      foundation's focus, outside-interaction, Escape and presence options.
    </p>
    <p>
      Foundation reference:
      <a v-if="framework === 'vue'" href="https://reka-ui.com/docs/components/dialog"
        >Reka Dialog API</a
      ><a v-else href="https://bits-ui.com/docs/components/dialog">Bits Dialog API</a>.
    </p>
  </section>
  <section id="accessibility" class="docs-section">
    <h2>Keyboard and accessibility</h2>
    <ul>
      <li>Trigger opens with Enter or Space.</li>
      <li>Tab and Shift+Tab remain inside a modal dialog.</li>
      <li>Escape closes the active layer and returns focus to its trigger.</li>
      <li>Title and Description label the dialog for assistive technology.</li>
      <li>Keep a visible close or cancel action, and a visible focus indicator.</li>
    </ul>
    <p>
      Outside-interaction and autofocus callbacks can be prevented. The wrapper's busy state blocks
      dismissal and disables its close button. Advanced parts leave application decisions to the
      host.
    </p>
  </section>
</template>
<style>
.dialog-docs-example {
  border: 1px solid var(--biss-border);
  border-radius: 10px;
  background: var(--biss-card);
  overflow: hidden;
}
.dialog-docs-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 10px 12px;
  background: var(--biss-surface-subtle);
  border-bottom: 1px solid var(--biss-border);
}
.dialog-docs-toolbar > label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--biss-muted);
  font-size: 12px;
}
.dialog-docs-toolbar select {
  font: 13px var(--biss-font-family);
  padding: 5px 8px;
  border: 1px solid var(--biss-border-strong);
  border-radius: 6px;
  background: var(--biss-card);
  color: var(--biss-text);
  max-width: 220px;
}
.dialog-docs-toolbar > .segmented {
  margin-inline-start: auto;
}
.dialog-docs-frame {
  display: block;
  width: 100%;
  height: 520px;
  border: 0;
  background: var(--biss-card);
}
.dialog-docs-caption,
.dialog-docs-source-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--biss-muted);
}
.dialog-docs-caption {
  margin: 0;
  padding: 14px 18px;
  border-bottom: 1px solid var(--biss-border-subtle);
}
.dialog-docs-code {
  position: relative;
}
.dialog-docs-code > button {
  position: absolute;
  right: 12px;
  top: 12px;
}
.dialog-docs-code pre {
  margin: 0;
  padding: 54px 20px 20px;
  max-height: 520px;
  overflow: auto;
  font: 12px/1.7 var(--biss-mono);
}
.dialog-example-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
@media (max-width: 640px) {
  .dialog-docs-frame {
    height: 560px;
  }
  .dialog-docs-toolbar > .segmented {
    margin-inline-start: 0;
  }
}
</style>
