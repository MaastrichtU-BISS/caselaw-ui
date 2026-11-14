<script lang="ts">
  import { BissAccordion } from 'biss-ui/svelte';

  let open = $state('data');
  const items = [
    {
      value: 'data',
      title: 'Where is research data stored?',
      content: 'On university servers in the Netherlands, encrypted at rest.',
    },
    {
      value: 'access',
      title: 'Who can see a project?',
      description: 'Members and invited reviewers',
      content: 'Only project members and the reviewers they invite.',
    },
    {
      value: 'export',
      title: 'Can I export my records?',
      content: 'Yes. Every table exports to CSV and Excel.',
    },
  ];
</script>

<BissAccordion bind:value={open} {items} />
