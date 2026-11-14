<script setup lang="ts">
import { ref } from 'vue';
import { BissTaskList } from 'biss-ui/vue';

const tasks = ref([
  { id: 'a1', title: 'Upload the signed consortium agreement', done: false, owner: 'Lena Vos', due: '3 Dec' },
  { id: 'a2', title: 'Budget approval', done: false, owner: 'Grants Office', status: 'Pending', readonly: true },
  { id: 'a3', title: 'Dean signature', done: true, owner: 'Dean', status: 'Signed', readonly: true },
]);

function complete({ id, done }: { id: string; done: boolean }) {
  tasks.value = tasks.value.map((task) => (task.id === id ? { ...task, done } : task));
}
</script>

<template>
  <BissTaskList label="Approvals" :items="tasks" @complete="complete" />
</template>
