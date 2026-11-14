<script lang="ts">
  import { BissCommentThread, type BissComment } from 'biss-ui/svelte';

  const comments: BissComment[] = [
    { id: 'c1', author: 'Sofie Peeters', time: '2 Oct', body: 'Final figures for the annual report are in the shared folder.' },
    { id: 'c2', author: 'Tom Jansen', time: '3 Oct', body: 'Checked against the ledger. Submitted to the faculty office.' },
  ];
</script>

<BissCommentThread label="Annual report 2025" items={comments} readonly />
