<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BissButton, BissDataTable, type BissTableColumn } from 'biss-ui/vue';

const columns: BissTableColumn[] = [
  { key: 'title', label: 'Report' },
  { key: 'project', label: 'Project' },
  { key: 'due', label: 'Due' },
];

const reports = ref<{ id: string; title: string; project: string; due: string }[]>([]);
const loading = ref(true);

async function refresh() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Your request goes here.
  reports.value = [];
  loading.value = false;
}

onMounted(refresh);
</script>

<template>
  <div class="biss-stack biss-stack-sm">
    <BissDataTable
      :columns="columns"
      :rows="reports"
      :loading="loading"
      :loading-rows="3"
      empty="No reports are due in the next 30 days."
    />
    <div>
      <BissButton variant="secondary" size="sm" :loading="loading" @click="refresh">
        Refresh
      </BissButton>
    </div>
  </div>
</template>
