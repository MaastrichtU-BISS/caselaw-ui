<script lang="ts">
  import { BissFilterBuilder, type BissFilterField, type BissFilterRule } from 'biss-ui/svelte';

  type Project = { id: string; title: string; status: string; funder: string };

  const projects: Project[] = [
    { id: 'p1', title: 'Court reasoning at scale', status: 'Active', funder: 'NWO' },
    { id: 'p2', title: 'Precedent networks in EU law', status: 'Active', funder: 'ERC' },
    { id: 'p3', title: 'Open data for legal research', status: 'Proposal', funder: 'UM Fund' },
    { id: 'p4', title: 'Citizen access to case law', status: 'Closed', funder: 'Horizon Europe' },
    { id: 'p5', title: 'Annotation tools for jurists', status: 'Active', funder: 'NWO' },
  ];

  const fields: BissFilterField[] = [
    { key: 'status', label: 'Status', operators: [{ value: 'is', label: 'is' }, { value: 'is-not', label: 'is not' }] },
    { key: 'funder', label: 'Funder', operators: [{ value: 'is', label: 'is' }] },
    { key: 'title', label: 'Title', operators: [{ value: 'contains', label: 'contains' }] },
  ];

  let rules = $state<BissFilterRule[]>([
    { id: 'r1', field: 'status', operator: 'is', value: 'Active' },
    { id: 'r2', field: 'funder', operator: 'is', value: 'NWO' },
  ]);
  let match = $state<'all' | 'any'>('all');

  function test(rule: BissFilterRule, project: Project) {
    const actual = project[rule.field as keyof Project].toLowerCase();
    const wanted = rule.value.trim().toLowerCase();
    if (!wanted) return true;
    if (rule.operator === 'contains') return actual.includes(wanted);
    if (rule.operator === 'is-not') return actual !== wanted;
    return actual === wanted;
  }

  const results = $derived(
    projects.filter((project) =>
      !rules.length || match === 'all'
        ? rules.every((rule) => test(rule, project))
        : rules.some((rule) => test(rule, project)),
    ),
  );
</script>

<div class="biss-stack">
  <BissFilterBuilder
    label="Project filters"
    {fields}
    {rules}
    {match}
    onchange={(next) => (rules = next)}
    onmatch={(next) => (match = next)}
  />
  <div>
    <p role="status">{results.length} of {projects.length} projects match</p>
    <ul>
      {#each results as project (project.id)}
        <li>{project.title}</li>
      {/each}
    </ul>
  </div>
</div>
