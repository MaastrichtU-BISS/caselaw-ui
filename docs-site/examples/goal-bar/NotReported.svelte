<script lang="ts">
  import { BissGoalBar } from 'biss-ui/svelte';

  // The first data management plan review has not happened yet.
  const reviewScore = null;
</script>

<ul class="goals">
  <li>
    <span>
      Data management plan review
      <small class="biss-muted">Not reported yet</small>
    </span>
    <BissGoalBar value={reviewScore} label="Data management plan review score" />
  </li>
</ul>

<style>
  .goals {
    display: grid;
    gap: 14px;
    width: min(100%, 28rem);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .goals li {
    display: grid;
    gap: 6px;
  }
  .goals span {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
</style>
