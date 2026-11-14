<script lang="ts">
  import { onMount } from 'svelte';
  import { BissButton, BissDataTable, type BissTableColumn } from 'biss-ui/svelte';

  const columns: BissTableColumn[] = [
    { key: 'title', label: 'Report' },
    { key: 'project', label: 'Project' },
    { key: 'due', label: 'Due' },
  ];

  let reports = $state<{ id: string; title: string; project: string; due: string }[]>([]);
  let loading = $state(true);

  async function refresh() {
    loading = true;
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Your request goes here.
    reports = [];
    loading = false;
  }

  onMount(refresh);
</script>

<div class="biss-stack biss-stack-sm">
  <BissDataTable
    {columns}
    rows={reports}
    {loading}
    loadingRows={3}
    empty="No reports are due in the next 30 days."
  />
  <div>
    <BissButton variant="secondary" size="sm" {loading} onclick={refresh}>Refresh</BissButton>
  </div>
</div>
