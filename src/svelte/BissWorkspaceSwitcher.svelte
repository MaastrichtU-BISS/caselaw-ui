<script lang="ts">
  /**
   * The current workspace, with a popover to switch to another, find one by name or
   * create a new one. The host owns the workspaces and what switching does (usually
   * a reload): picking calls `onselect`, the create row calls `oncreate`.
   */
  import { tick } from 'svelte';
  import { Popover } from 'bits-ui';
  import BissIcon from './BissIcon.svelte';
  import BissCommandMenu from './BissCommandMenu.svelte';
  import { initials } from '../core/format';
  import { workspaceCommands, type BissCommand, type BissWorkspace } from '../core/commands';

  interface Props {
    workspaces: BissWorkspace[];
    /** Id of the workspace this page works in. */
    current?: string;
    /** Icon-only trigger, for a collapsed sidebar rail. */
    collapsed?: boolean;
    /** Show the search field when there are more workspaces than this. */
    searchThreshold?: number;
    /** Show the create action. */
    canCreate?: boolean;
    open?: boolean;
    label?: string;
    heading?: string;
    searchLabel?: string;
    emptyLabel?: string;
    createLabel?: string;
    currentLabel?: string;
    /** Trigger text when no workspace matches `current`. */
    placeholder?: string;
    width?: number;
    align?: 'start' | 'center' | 'end';
    portal?: boolean;
    onselect?: (workspace: BissWorkspace) => void;
    oncreate?: () => void;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    workspaces,
    current,
    collapsed = false,
    searchThreshold = 6,
    canCreate = true,
    open = $bindable(false),
    label = 'Switch workspace',
    heading = 'Your workspaces',
    searchLabel = 'Find a workspace',
    emptyLabel = 'No workspace matches “{query}”',
    createLabel = 'New workspace',
    currentLabel = 'Current workspace',
    placeholder = 'Choose a workspace',
    width = 260,
    align = 'start',
    portal = false,
    onselect,
    oncreate,
    onOpenChange,
  }: Props = $props();

  let query = $state('');
  let menu = $state<ReturnType<typeof BissCommandMenu> | null>(null);
  const active = $derived(workspaces.find((w) => w.id === current));
  const commands = $derived(workspaceCommands(workspaces, current));
  const searchable = $derived(workspaces.length > searchThreshold);
  const byId = (id: string) => workspaces.find((w) => w.id === id);
  const mark = (name?: string) => initials(name ?? '').slice(0, 1) || '?';

  function setOpen(value: boolean) {
    open = value;
    onOpenChange?.(value);
  }
  function focusMenu(event: Event) {
    event.preventDefault();
    query = '';
    tick().then(() => menu?.focus());
  }
  function pick(command: BissCommand) {
    const workspace = byId(command.key);
    setOpen(false);
    if (workspace && workspace.id !== current) onselect?.(workspace);
  }
  function create() {
    setOpen(false);
    oncreate?.();
  }
</script>

{#snippet markOf(workspace: BissWorkspace | undefined, name: string | undefined)}
  <span class="biss-workspace-mark" aria-hidden="true"
    >{#if workspace?.logo}<img src={workspace.logo} alt="" />{:else}{mark(name)}{/if}</span
  >
{/snippet}

<Popover.Root {open} onOpenChange={setOpen}>
  <Popover.Trigger
    class="biss-workspace-trigger"
    data-collapsed={collapsed || undefined}
    data-open={open || undefined}
    aria-label={`${label}: ${active?.name ?? placeholder}`}
    title={collapsed ? active?.name : undefined}
  >
    {@render markOf(active, active?.name)}
    {#if !collapsed}<span class="biss-workspace-name"
        ><span>{active?.name ?? placeholder}</span>{#if active?.detail}<small
            >{active.detail}</small
          >{/if}</span
      ><BissIcon name="chev" />{/if}
  </Popover.Trigger>
  <Popover.Portal disabled={!portal}>
    <Popover.Content
      class="biss-block-popover biss-workspace-panel"
      {align}
      sideOffset={6}
      collisionPadding={8}
      aria-label={label}
      style={`width:${width}px`}
      onOpenAutoFocus={focusMenu}
    >
      {#if !searchable}<p class="biss-workspace-heading" aria-hidden="true">{heading}</p>{/if}
      <BissCommandMenu
        bind:this={menu}
        bind:query
        items={commands}
        label={heading}
        {searchable}
        {searchLabel}
        {emptyLabel}
        checkedLabel={currentLabel}
        grouped={false}
        hint={false}
        onpick={pick}
        onclose={() => setOpen(false)}
      >
        {#snippet leading(item)}{@render markOf(byId(item.key), item.label)}{/snippet}
      </BissCommandMenu>
      {#if canCreate}<button type="button" class="biss-workspace-create" onclick={create}
          ><BissIcon name="plus" />{createLabel}</button
        >{/if}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
