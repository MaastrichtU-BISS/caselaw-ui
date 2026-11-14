<script lang="ts">
  import {
    BissAppShell,
    BissButton,
    BissNavItem,
    BissNavSection,
    BissPageHeader,
    BissSidebarUser,
  } from 'biss-ui/svelte';

  const sections = [
    {
      heading: 'Research',
      items: [
        { id: 'projects', label: 'Projects', meta: 12 },
        { id: 'grants', label: 'Grants', meta: 3 },
        { id: 'deadlines', label: 'Deadlines' },
      ],
    },
    {
      heading: 'Administration',
      items: [
        { id: 'team', label: 'Team' },
        { id: 'budget', label: 'Budget' },
      ],
    },
  ];

  let active = $state('projects');
  const page = $derived(sections.flatMap((section) => section.items).find((item) => item.id === active)!);
</script>

<BissAppShell brand="Law & Tech Lab" mark="L">
  {#snippet sidebar()}
    {#each sections as section (section.heading)}
      <BissNavSection heading={section.heading}>
        {#each section.items as item (item.id)}
          <BissNavItem
            href={`#${item.id}`}
            label={item.label}
            meta={'meta' in item ? item.meta : undefined}
            active={active === item.id}
            onclick={(event: MouseEvent) => {
              event.preventDefault();
              active = item.id;
            }}
          />
        {/each}
      </BissNavSection>
    {/each}
  {/snippet}
  {#snippet sidebarFooter()}
    <BissSidebarUser name="Lena Vos" email="l.vos@maastrichtuniversity.nl" />
  {/snippet}

  <BissPageHeader eyebrow="Research" title={page.label} subtitle="Everything the lab is working on this term.">
    {#snippet actions()}
      <BissButton>New project</BissButton>
    {/snippet}
  </BissPageHeader>
</BissAppShell>
