<script lang="ts">
  import { BissAvatar } from 'biss-ui/svelte';

  const members = [
    { name: 'Mei Lin Chen', role: 'Principal investigator' },
    { name: 'Joost van Dijk', role: 'Postdoctoral researcher' },
    { name: 'Amara Okafor', role: 'Data steward' },
  ];
</script>

<ul class="biss-stack biss-stack-sm" style="margin: 0; padding: 0; list-style: none">
  {#each members as member (member.name)}
    <li style="display: flex; gap: 10px; align-items: center">
      <BissAvatar name={member.name} />
      <span>
        <strong>{member.name}</strong><br />
        <small style="color: var(--biss-muted)">{member.role}</small>
      </span>
    </li>
  {/each}
</ul>
