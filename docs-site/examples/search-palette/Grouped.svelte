<script lang="ts">
  import { BissButton, BissIcon, BissSearchPalette, type BissSearchItem } from 'biss-ui/svelte';

  const items: BissSearchItem[] = [
    { key: 'p-ecli', group: 'Projects', icon: 'folder', label: 'ECLI citation network', description: 'Law and Tech Lab' },
    { key: 'p-gdpr', group: 'Projects', icon: 'folder', label: 'GDPR enforcement tracker', description: 'Privacy group' },
    { key: 'u-lena', group: 'People', icon: 'user', label: 'Lena Janssen', description: 'Principal investigator' },
    { key: 'u-tom', group: 'People', icon: 'user', label: 'Tom Peeters', description: 'Research assistant' },
    { key: 'a-new', group: 'Actions', icon: 'plus', label: 'New project' },
    { key: 'a-invite', group: 'Actions', icon: 'mail', label: 'Invite a colleague' },
  ];
  let open = $state(false);
  let chosen = $state('');

  function pick(item: BissSearchItem) {
    chosen = item.label;
    open = false;
  }
</script>

<BissButton variant="secondary" onclick={() => (open = true)}>
  <BissIcon name="search" />Search
</BissButton>
{#if chosen}<p role="status">Opened {chosen}</p>{/if}
<BissSearchPalette
  {open}
  {items}
  label="Search the workspace"
  placeholder="Projects, people, actions…"
  onpick={pick}
  onclose={() => (open = false)}
/>
