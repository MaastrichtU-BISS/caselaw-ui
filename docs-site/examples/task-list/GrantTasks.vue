<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissTaskList } from 'biss-ui/vue';

const tasks = ref([
  { id: 't1', title: 'Draft the research summary', done: true, owner: 'Lena Vos', due: '18 Nov' },
  { id: 't2', title: 'Collect letters of support', done: false, owner: 'Tom Jansen', due: '22 Nov', status: 'Waiting on 2' },
  { id: 't3', title: 'Finalise the budget table', done: false, owner: 'Aisha Bakker', due: '25 Nov' },
  { id: 't4', title: 'Data management plan', done: false, owner: 'Sofie Peeters', due: '27 Nov' },
  { id: 't5', title: 'Submit in the NWO portal', done: false, owner: 'Lena Vos', due: '1 Dec' },
]);
const done = computed(() => tasks.value.filter((task) => task.done).length);

function complete({ id, done }: { id: string; done: boolean }) {
  tasks.value = tasks.value.map((task) => (task.id === id ? { ...task, done } : task));
}
</script>

<template>
  <div class="biss-stack biss-stack-sm">
    <p role="status">{{ done }} of {{ tasks.length }} done</p>
    <BissTaskList label="Vidi application" :items="tasks" @complete="complete" />
  </div>
</template>
