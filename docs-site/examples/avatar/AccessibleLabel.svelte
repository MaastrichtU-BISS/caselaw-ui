<script lang="ts">
  import { BissAvatar } from 'biss-ui/svelte';

  const assignee = 'Lukas Weber';
</script>

<p style="display: flex; gap: 8px; align-items: center; margin: 0">
  Ethics application
  <BissAvatar name={assignee} size={24} label={`Assigned to ${assignee}`} />
</p>
