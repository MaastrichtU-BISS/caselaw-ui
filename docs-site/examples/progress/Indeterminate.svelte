<script lang="ts">
  import { BissButton, BissProgress } from 'biss-ui/svelte';

  let value = $state<number | null>(null);
  let timer: ReturnType<typeof setInterval> | undefined;

  function start() {
    value = null;
    clearInterval(timer);
    setTimeout(() => {
      value = 0;
      timer = setInterval(() => {
        value = Math.min(100, (value ?? 0) + 10);
        if (value === 100) clearInterval(timer);
      }, 250);
    }, 1200);
  }
  $effect(() => () => clearInterval(timer));
</script>

<BissProgress {value} label="Importing records" showLabel showValue />
<BissButton variant="secondary" size="sm" onclick={start}>Run import</BissButton>
