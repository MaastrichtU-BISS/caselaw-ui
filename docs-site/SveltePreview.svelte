<script lang="ts">
  import { onDestroy, untrack } from 'svelte';
  import * as UI from '../src/svelte';
  import { createBissToasts } from '../src/core/toasts';
  import { fixture } from './fixtures';
  import catalog from './generated/components.json';
  let { name, state: exampleState = 'default' }: { name: string; state?: string } = $props();
  const data = $state(untrack(() => fixture(name, exampleState)));
  const value = data.props as Record<string, any>;
  const C = $derived((UI as Record<string, any>)[name]);
  const queue = createBissToasts();
  onDestroy(queue.destroy);
  if (untrack(() => name === 'BissToastStack'))
    queue.push('Changes saved', {
      copy: 'Your team sees the latest version.',
      tone: 'success',
      timeout: 0,
    });
  const authored = $derived(
    new Set(
      catalog.components.find((c) => c.name === name)?.svelte?.props.map((p) => p.name) ?? [],
    ),
  );
  let feedback = $state('');
  function change(v: any) {
    const key =
      'modelValue' in value
        ? 'modelValue'
        : ['BissLabelEditor', 'BissAgenda', 'BissWidgetGrid'].includes(name)
          ? 'items'
          : name === 'BissColumnManager'
            ? 'columns'
            : name === 'BissFilterBuilder'
              ? 'rules'
              : name === 'BissCheckbox'
                ? 'checked'
                : ['BissValuePicker', 'BissOnboardingChips', 'BissRoleEditor'].includes(name)
                  ? 'selected'
                  : 'value';
    value[key] = v;
    feedback = 'Updated';
  }
  const callbacks = {
    onchange: change,
    oncolumns: (v: any) => (value.columns = v),
    onselect: (v: any) => (value.selected = v),
    onsort: (v: any) => {
      value.sortKey = v.key;
      value.sortDirection = v.direction;
    },
    onresize: (v: any) => (value.size = v),
    onmatch: (v: any) => (value.match = v),
    onclose: () => {
      value.open = false;
      value.modelValue = false;
    },
    onsave: () => (feedback = 'Changes saved'),
    ondiscard: () => (feedback = 'Changes discarded'),
    onsubmit: () => (feedback = 'Comment submitted'),
    oninvite: () => (feedback = 'Invitation requested'),
    onapprove: () => (feedback = 'Change requested'),
    onpick: () => (feedback = 'Selected'),
    onclick: () => (feedback = 'Action selected'),
    oncomplete: (v: any) =>
      (value.items = value.items.map((i: any) => (i.id === v.id ? { ...i, done: v.done } : i))),
    onrole: (v: any) =>
      (value.entries = value.entries.map((i: any) => (i.id === v.id ? { ...i, role: v.role } : i))),
    onresolve: (v: boolean) => (value.resolved = v),
    onremove: (id: string) => {
      const key = name === 'BissAttachmentList' ? 'items' : 'entries';
      value[key] = value[key].filter((i: any) => i.id !== id);
    },
    oncomment: (body: string) =>
      (value.items = [
        ...value.items,
        { id: 'reply' + Date.now(), author: 'You', body, time: 'Just now' },
      ]),
    onmove: (v: any) =>
      (value.cards = value.cards.map((c: any) => (c.id === v.id ? { ...c, lane: v.lane } : c))),
  };
  const handlers = Object.fromEntries(
    Object.entries(callbacks).filter(
      ([key]) => authored.has(key) || (key === 'onclick' && name === 'BissButton'),
    ),
  );
  const renderProps = $derived({
    ...value,
    ...(name==='BissViewTabs'?{value:value.modelValue}:{}),
    ...(['BissModal','BissConfirmDialog'].includes(name)?{open:value.modelValue}:{}),
    ...('open' in value ? { open: value.open } : {}),
    ...(name==='BissToastStack'?{queue}:{}),
    ...handlers,
  });
</script>

{#snippet children(context: any = undefined)}
  {#if name === 'BissField'}<UI.BissInput modelValue="Open justice" />
  {:else if ['BissDialog', 'BissModal', 'BissSidePanel'].includes(name)}<UI.BissField
      label="Project name"
      hint="Use a recognizable name."><UI.BissInput modelValue="Open justice" /></UI.BissField
    >
  {:else if ['BissAppShell', 'BissConsoleLayout', 'BissGridShell'].includes(name)}<div
      style="padding:24px"
    >
      <UI.BissDataTable {...fixture('BissDataTable').props as any} />
    </div>
  {:else if name === 'BissHomeCard'}<UI.BissCapacityBar
      allocated={0.6}
      available={0.8}
      label="Team capacity"
    />
  {:else if name === 'BissSteps'}<UI.BissStep
      index={1}
      title="Name the workspace"
      done
    /><UI.BissStep index={2} title="Invite the team" current />
  {:else if name === 'BissWidgetGrid'}<p>
      {context?.item?.title ?? 'Connect your application’s data here.'}
    </p>
  {:else if name === 'BissNavSection'}<UI.BissNavItem
      label="Projects"
      href="#"
      active
    /><UI.BissNavItem label="People" href="#" />
  {:else}{data.text ?? ''}{/if}
{/snippet}
{#snippet actions()}<UI.BissButton onclick={() => (feedback = 'Action selected')}
    >{name === 'BissPageBar' ? 'New project' : 'Done'}</UI.BissButton
  >{/snippet}
{#snippet start()}<p>Project navigation</p>{/snippet}
{#snippet end()}<p>Your project content</p>{/snippet}
{#snippet sidebar()}<UI.BissNavItem label="Projects" active href="#" />{/snippet}
{#if C}{@const snippets = Object.fromEntries(
    Object.entries({
      children,
      actions,
      footer: actions,
      start,
      end,
      sidebar,
      nav: sidebar,
    }).filter(([key]) => authored.has(key)),
  )}
  <div
    class="preview-frame"
    class:preview-wide={data.wide}
    class:preview-shell={['BissAppShell', 'BissConsoleLayout', 'BissGridShell'].includes(name)}
    data-component={name}
    data-framework="svelte"
  >
    <C {...renderProps} {...snippets} />{#if feedback}<p class="preview-feedback" role="status">
        {feedback}
      </p>{/if}
  </div>
{/if}
