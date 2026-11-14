<script lang="ts">
  import { BissWorkspaceSwitcher, type BissWorkspace } from 'biss-ui/svelte';

  const workspaces: BissWorkspace[] = [
    { id: 'law', name: 'Faculty of Law', detail: 'Research office · Admin' },
    { id: 'biss', name: 'BISS Institute', detail: 'Data science · Editor' },
    { id: 'grants', name: 'Grants support', detail: 'Funding office · Viewer' },
  ];
  let current = $state('law');
  let open = $state(true);
  let status = $state('');

  function select(workspace: BissWorkspace) {
    current = workspace.id; // Usually: reload the app in the new workspace.
    status = `Switched to ${workspace.name}`;
  }
</script>

<div class="example-switch">
  <BissWorkspaceSwitcher
    bind:open
    {workspaces}
    {current}
    onselect={select}
    oncreate={() => (status = 'Create a workspace requested')}
  />
  <p role="status" class="example-status">{status}</p>
</div>

<style>
  .example-switch {
    width: 240px;
    align-self: flex-start;
  }
  .example-status {
    margin: 230px 0 0;
    color: var(--biss-muted);
    font-size: 13px;
  }
</style>
