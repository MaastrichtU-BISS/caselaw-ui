<script lang="ts">
  import { BissButton, BissTour, type BissTourStep } from 'biss-ui/svelte';

  const steps: BissTourStep[] = [
    {
      id: 'new',
      target: '[data-tour="new-project"]',
      title: 'Start a project',
      body: 'Create a project for each grant, study or collaboration. You can invite the team later.',
      placement: 'bottom',
    },
    {
      id: 'filters',
      target: '[data-tour="filters"]',
      title: 'Find your work',
      body: 'Narrow the list by team or funder. Filters are kept when you come back.',
    },
    {
      id: 'projects',
      target: '[data-tour="projects"]',
      title: 'Every project in one place',
      body: 'Open a project to see its budget, deliverables and documents.',
      placement: 'top',
    },
    {
      id: 'done',
      title: 'You are ready',
      body: 'Restart this tour from the help menu at any time.',
    },
  ];
  let open = $state(true);
  let step = $state(0);
  let outcome = $state('');
</script>

<div class="example-page">
  <header>
    <h2>Research projects</h2>
    <BissButton data-tour="new-project">New project</BissButton>
  </header>
  <div class="example-filters" data-tour="filters">
    <BissButton variant="secondary" size="sm">Team: Law &amp; Society</BissButton>
    <BissButton variant="secondary" size="sm">Funder: any</BissButton>
  </div>
  <ul data-tour="projects">
    <li><strong>Open justice</strong><span>NWO · On track</span></li>
    <li><strong>Courts and citizens</strong><span>Horizon Europe · Proposal</span></li>
    <li><strong>Public access study</strong><span>Internal · Paused</span></li>
  </ul>
  <p role="status">
    {outcome}
    <BissButton
      variant="ghost"
      size="sm"
      onclick={() => {
        step = 0;
        open = true;
      }}>Take the tour</BissButton
    >
  </p>
</div>
<BissTour
  bind:open
  bind:step
  {steps}
  label="Projects page tour"
  onfinish={() => (outcome = 'Tour finished.')}
  onskip={(index) => (outcome = `Tour skipped at step ${index + 1}.`)}
/>

<style>
  .example-page {
    display: grid;
    gap: 14px;
    max-width: 720px;
  }
  .example-page header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .example-page h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
  .example-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-self: start;
  }
  .example-page ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--biss-border);
    border-radius: var(--biss-radius-md);
  }
  .example-page li {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 4px 12px;
    padding: 10px 14px;
    font-size: 13.5px;
  }
  .example-page li + li {
    border-top: 1px solid var(--biss-border);
  }
  .example-page li span,
  .example-page p {
    color: var(--biss-muted);
    font-size: 13px;
  }
  .example-page p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
