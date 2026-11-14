<script lang="ts">
  import { BissCommandMenu, type BissCommand } from 'biss-ui/svelte';

  const commands: BissCommand[] = [
    { key: 'heading', label: 'Heading', description: 'A section title', group: 'Text', icon: 'heading', shortcut: '#' },
    { key: 'list', label: 'Bulleted list', description: 'A simple list', group: 'Text', icon: 'list', shortcut: '-' },
    { key: 'quote', label: 'Quote', description: 'Cite a source or decision', group: 'Text', icon: 'quote' },
    { key: 'tasks', label: 'Task list', description: 'Track actions with owners', group: 'Planning', icon: 'checkbox', keywords: ['todo'] },
    { key: 'deadline', label: 'Deadline', description: 'A dated milestone', group: 'Planning', icon: 'cal' },
    { key: 'budget', label: 'Budget table', description: 'Grant costs by line', group: 'Data', icon: 'sigma', disabled: true },
    { key: 'chart', label: 'Chart', description: 'Publications per year', group: 'Data', icon: 'chart' },
  ];

  let text = $state('/');
  let inserted = $state('');
  let activeId = $state<string | undefined>();
  let menu = $state<ReturnType<typeof BissCommandMenu> | null>(null);
  const open = $derived(text.startsWith('/'));

  function keydown(event: KeyboardEvent) {
    if (open) menu?.handleKey(event);
  }
  function pick(item: BissCommand) {
    inserted = item.label; // Insert the block in your editor here.
    text = '';
  }
</script>

<div class="example-slash">
  <input
    bind:value={text}
    class="biss-input"
    aria-label="Meeting notes"
    placeholder="Type / for commands"
    role="combobox"
    aria-expanded={open}
    aria-controls={open ? menu?.listId : undefined}
    aria-activedescendant={open ? activeId : undefined}
    onkeydown={keydown}
  />
  {#if open}
    <BissCommandMenu
      bind:this={menu}
      bind:activeId
      items={commands}
      query={text.slice(1)}
      label="Insert a block"
      onpick={pick}
      onclose={() => (text = '')}
    />
  {/if}
  <p role="status" class="example-status">{inserted ? `Inserted ${inserted}` : 'Nothing inserted yet.'}</p>
</div>

<style>
  .example-slash {
    display: grid;
    gap: 8px;
    width: min(100%, 360px);
    align-self: flex-start;
  }
  .example-status {
    margin: 0;
    color: var(--biss-muted);
    font-size: 13px;
  }
</style>
