/** Copyable examples use each framework's shipped event and composition contract. */
export function example(name: string, framework: 'vue' | 'svelte'): string | undefined {
  const vue = framework === 'vue';
  const wrap = (names: string[], body: string, state = '') =>
    vue
      ? `<script setup lang="ts">\n${state ? "import { ref } from 'vue';\n" : ''}import { ${names.join(', ')} } from 'biss-ui/vue';\nimport 'biss-ui/styles.css';\n${state}\n</scr` +
        `ipt>\n\n<template>\n${body
          .split('\n')
          .map((l) => '  ' + l)
          .join('\n')}\n</template>`
      : `<script lang="ts">\nimport { ${names.join(', ')} } from 'biss-ui/svelte';\nimport 'biss-ui/styles.css';\n${state}\n</scr` +
        `ipt>\n\n${body}`;
  if (name === 'BissDatePicker' || name === 'BissDateField')
    return wrap(
      [name],
      vue
        ? `<${name} :value="day" @change="day = $event" label="Due date" />`
        : `<${name} value={day} onchange={value => day = value} label="Due date" />`,
      vue
        ? "const day = ref<string | null>('2026-11-12');"
        : "let day = $state<string | null>('2026-11-12');",
    );
  if (name === 'BissSelectPicker')
    return wrap(
      [name],
      vue
        ? '<BissSelectPicker label="Team" :options="options" :value="team"\n  @change="team = $event" />'
        : '<BissSelectPicker label="Team" {options} value={team}\n  onchange={value => team = value} />',
      (vue ? "const team = ref('research');" : "let team = $state('research');") +
        "\nconst options = [\n  { value: 'research', label: 'Research' },\n  { value: 'operations', label: 'Operations' },\n];",
    );
  if (name === 'BissMenu')
    return wrap(
      [name],
      vue
        ? '<BissMenu label="Project actions" :items="items" @pick="handlePick" />'
        : '<BissMenu label="Project actions" {items} onpick={handlePick} />',
      "const items = [\n  { key: 'export', label: 'Export' },\n  { key: 'archive', label: 'Archive' },\n];\nfunction handlePick(item: { key: string }) {\n  console.log(item.key); // Run the application action here.\n}",
    );
  if (name === 'BissValuePicker' || name === 'BissOnboardingChips')
    return wrap(
      [name],
      vue
        ? `<${name} label="Team interests" :options="options" :selected="selected"\n  @change="selected = $event" />`
        : `<${name} label="Team interests" {options} {selected}\n  onchange={value => selected = value} />`,
      (vue
        ? "const selected = ref<string[]>(['research']);"
        : "let selected = $state<string[]>(['research']);") +
        "\nconst options = [\n  { value: 'research', label: 'Research' },\n  { value: 'operations', label: 'Operations' },\n];",
    );
  if (name === 'BissDialog' || name === 'BissSidePanel')
    return wrap(
      [name, 'BissButton'],
      vue
        ? `<BissButton @click="open = true">Edit project</BissButton>\n<${name} :open="open" title="Edit project" @close="open = false">\n  <label>Project name <input value="Open justice" /></label>\n  <template #actions>\n    <BissButton @click="open = false">Done</BissButton>\n  </template>\n</${name}>`
        : `<BissButton onclick={() => open = true}>Edit project</BissButton>\n<${name} {open} title="Edit project" onclose={() => open = false}>\n  <label>Project name <input value="Open justice" /></label>\n  {#snippet actions()}\n    <BissButton onclick={() => open = false}>Done</BissButton>\n  {/snippet}\n</${name}>`,
      vue ? 'const open = ref(false);' : 'let open = $state(false);',
    );
  if (name === 'BissModal' || name === 'BissConfirmDialog')
    return wrap(
      [name, 'BissButton'],
      vue
        ? `<BissButton @click="open = true">Open ${name === 'BissModal' ? 'settings' : 'confirmation'}</BissButton>\n<${name} v-model="open" title="${name === 'BissModal' ? 'Project settings' : 'Delete project?'}">\n  <p>${name === 'BissModal' ? 'Choose the settings for this project.' : 'This removes the project and its records.'}</p>\n</${name}>`
        : `<BissButton onclick={() => open = true}>Open dialog</BissButton>\n<${name} bind:open title="${name === 'BissModal' ? 'Project settings' : 'Delete project?'}">\n  <p>${name === 'BissModal' ? 'Choose the settings for this project.' : 'This removes the project and its records.'}</p>\n</${name}>`,
      vue ? 'const open = ref(false);' : 'let open = $state(false);',
    );
  if (name === 'BissField')
    return wrap(
      ['BissField', 'BissInput'],
      vue
        ? '<BissField label="Project name" hint="Use a recognizable name.">\n  <template #default="{ id, invalid }">\n    <BissInput :id="id" v-model="name" :invalid="invalid" />\n  </template>\n</BissField>'
        : '<BissField label="Project name" hint="Use a recognizable name.">\n  {#snippet children({id, invalid})}\n    <BissInput {id} bind:modelValue={name} {invalid} />\n  {/snippet}\n</BissField>',
      vue ? "const name = ref('Open justice');" : "let name = $state('Open justice');",
    );
  if (name === 'BissHomeCard')
    return wrap(
      ['BissHomeCard', 'BissCapacityBar'],
      vue
        ? '<BissHomeCard title="Team capacity" note="Allocated team effort">\n  <BissCapacityBar :allocated="0.6" :available="0.8" label="Capacity" />\n</BissHomeCard>'
        : '<BissHomeCard title="Team capacity" note="Allocated team effort">\n  <BissCapacityBar allocated={0.6} available={0.8} label="Capacity" />\n</BissHomeCard>',
    );
  if (name === 'BissSteps' || name === 'BissStep')
    return wrap(
      ['BissSteps', 'BissStep'],
      vue
        ? '<BissSteps>\n  <BissStep :index="1" title="Name the workspace" done />\n  <BissStep :index="2" title="Invite the team" current />\n</BissSteps>'
        : '<BissSteps>\n  <BissStep index={1} title="Name the workspace" done />\n  <BissStep index={2} title="Invite the team" current />\n</BissSteps>',
    );
  if (name === 'BissToolbar')
    return wrap(
      ['BissToolbar', 'BissToolButton'],
      '<BissToolbar label="Project tools">\n  <BissToolButton label="Filter" icon="filter" />\n</BissToolbar>',
    );
  if (name === 'BissPageBar')
    return wrap(
      ['BissPageBar', 'BissButton'],
      vue
        ? '<BissPageBar title="Projects" description="The team’s work">\n  <template #actions><BissButton>New project</BissButton></template>\n</BissPageBar>'
        : '<BissPageBar title="Projects" description="The team’s work">\n  {#snippet actions()}<BissButton>New project</BissButton>{/snippet}\n</BissPageBar>',
    );
  if (name === 'BissPopover')
    return wrap(
      [name],
      '<BissPopover label="Project details">\n  <p>Choose settings for this project.</p>\n</BissPopover>',
    );
  if (name === 'BissToastStack')
    return vue
      ? wrap(
          ['BissToastStack', 'BissButton', 'useBissToasts'],
          '<BissButton @click="toasts.success(\'Changes saved\')">Save</BissButton>\n<BissToastStack />',
          'const toasts = useBissToasts();',
        )
      : wrap(
          ['BissToastStack','BissButton'],
          '<BissButton onclick={() => queue.push(\'Changes saved\', {tone: \'success\'})}>Save</BissButton>\n<BissToastStack {queue} />',
          "import {onDestroy} from 'svelte';\nimport {createBissToasts} from 'biss-ui';\nconst queue=createBissToasts();\nonDestroy(queue.destroy);",
        );
  return undefined;
}
