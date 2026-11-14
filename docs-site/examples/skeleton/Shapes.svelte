<script lang="ts">
  import { BissSkeleton } from 'biss-ui/svelte';
</script>

<div class="biss-stack" style="width: min(100%, 30rem)" aria-busy="true">
  <span class="biss-visually-hidden" role="status">Loading grant applications</span>
  <!-- Page title -->
  <BissSkeleton height="24px" width="45%" />
  <!-- Intro paragraph -->
  <BissSkeleton lines={2} height="12px" gap="8px" />
  <!-- Table rows -->
  <BissSkeleton lines={5} height="32px" gap="6px" />
</div>
