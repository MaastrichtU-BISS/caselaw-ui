<script lang="ts">
  import { BissButton, BissToastStack, createBissToasts } from 'biss-ui/svelte';

  const toasts = createBissToasts();

  function showAll() {
    toasts.clear();
    toasts.push('Export started', { copy: 'You will get an email when the CSV is ready.' });
    toasts.push('Budget approved', { tone: 'success', copy: 'WP2 Data infrastructure · €48,000' });
    toasts.push('Report due in 3 days', {
      tone: 'warning',
      copy: 'Mid-term review for ERC StG 101076',
    });
    toasts.push('Upload failed', {
      tone: 'danger',
      copy: 'interviews-round-2.zip is larger than 2 GB.',
      timeout: 0,
    });
  }
</script>

<BissButton variant="secondary" onclick={showAll}>Show every tone</BissButton>
<BissToastStack queue={toasts} />
