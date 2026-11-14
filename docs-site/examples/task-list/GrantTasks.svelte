<script lang="ts">
  import { BissTaskList } from 'biss-ui/svelte';

  let tasks = $state([
    { id: 't1', title: 'Draft the research summary', done: true, owner: 'Lena Vos', due: '18 Nov' },
    { id: 't2', title: 'Collect letters of support', done: false, owner: 'Tom Jansen', due: '22 Nov', status: 'Waiting on 2' },
    { id: 't3', title: 'Finalise the budget table', done: false, owner: 'Aisha Bakker', due: '25 Nov' },
    { id: 't4', title: 'Data management plan', done: false, owner: 'Sofie Peeters', due: '27 Nov' },
    { id: 't5', title: 'Submit in the NWO portal', done: false, owner: 'Lena Vos', due: '1 Dec' },
  ]);
  const done = $derived(tasks.filter((task) => task.done).length);

  function complete({ id, done }: { id: string; done: boolean }) {
    tasks = tasks.map((task) => (task.id === id ? { ...task, done } : task));
  }
</script>

<div class="biss-stack biss-stack-sm">
  <p role="status">{done} of {tasks.length} done</p>
  <BissTaskList label="Vidi application" items={tasks} oncomplete={complete} />
</div>
