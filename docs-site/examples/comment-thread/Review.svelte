<script lang="ts">
  import { BissCommentThread, type BissComment } from 'biss-ui/svelte';

  let comments = $state<BissComment[]>([
    { id: 'c1', author: 'Marco Rossi', time: 'Yesterday, 16:20', body: 'The sampling section needs the exclusion criteria for pre-2010 judgments.' },
    { id: 'c2', author: 'Lena Vos', time: 'Today, 09:05', body: 'Added them under 3.2. Can you check the wording?' },
  ]);
  let resolved = $state(false);

  function post(body: string) {
    comments = [...comments, { id: `c${comments.length + 1}`, author: 'You', time: 'Just now', body }];
  }
</script>

<BissCommentThread
  label="Methods, section 3.2"
  items={comments}
  {resolved}
  oncomment={post}
  onresolve={(value) => (resolved = value)}
/>
