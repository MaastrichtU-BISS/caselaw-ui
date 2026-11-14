<script lang="ts">
  import {
    BissAvatar,
    BissHeaderAction,
    BissIcon,
    BissNavItem,
    BissNavSection,
    BissSidebar,
    BissSidebarUser,
    BissWorkspaceSwitcher,
  } from 'biss-ui/svelte';

  let collapsed = $state(false);
  let drawer = $state(false);
  const workspaces = [
    { id: 'law', name: 'Faculty of Law', detail: 'Research office' },
    { id: 'biss', name: 'BISS Institute', detail: 'Data science' },
  ];
</script>

<div class="example-app">
  <BissSidebar bind:collapsed bind:mobileOpen={drawer} label="Research office">
    {#snippet brand(rail)}
      <BissWorkspaceSwitcher {workspaces} current="law" collapsed={rail} />
    {/snippet}
    {#snippet children()}
      <BissNavSection heading="Workspace">
        <BissNavItem label="Home" href="#home">{#snippet icon()}<BissIcon name="home" />{/snippet}</BissNavItem>
        <BissNavItem label="Projects" href="#projects" meta="12" active aria-current="page"
          >{#snippet icon()}<BissIcon name="kanban" />{/snippet}</BissNavItem
        >
        <BissNavItem label="Grants" href="#grants" meta="4">{#snippet icon()}<BissIcon name="deals" />{/snippet}</BissNavItem>
        <BissNavItem label="People" href="#people">{#snippet icon()}<BissIcon name="people" />{/snippet}</BissNavItem>
      </BissNavSection>
      <BissNavSection heading="Administration">
        <BissNavItem label="Budgets" href="#budgets">{#snippet icon()}<BissIcon name="sigma" />{/snippet}</BissNavItem>
        <BissNavItem label="Reports" href="#reports">{#snippet icon()}<BissIcon name="chart" />{/snippet}</BissNavItem>
      </BissNavSection>
    {/snippet}
    {#snippet pinned()}
      <BissNavItem label="Open justice" href="#open-justice">{#snippet icon()}<BissIcon name="pin" />{/snippet}</BissNavItem>
      <BissNavItem label="Horizon proposal" href="#horizon">{#snippet icon()}<BissIcon name="file" />{/snippet}</BissNavItem>
    {/snippet}
    {#snippet footer(rail)}
      {#if rail}<BissAvatar name="Ada Lovelace" size={30} />{:else}<BissSidebarUser
          name="Ada Lovelace"
          email="ada@example.org"
        />{/if}
    {/snippet}
  </BissSidebar>
  <main class="example-main">
    <header>
      <span class="example-menu"
        ><BissHeaderAction label="Open navigation" icon="menu" onclick={() => (drawer = true)} /></span
      >
      <strong>Projects</strong>
    </header>
    <p>Twelve research projects across three teams.</p>
  </main>
</div>

<style>
  .example-app {
    display: flex;
    height: 540px;
    border: 1px solid var(--biss-border);
    border-radius: var(--biss-radius-lg);
    overflow: hidden;
    background: var(--biss-bg);
  }
  .example-main {
    flex: 1;
    min-width: 0;
    padding: 16px 20px;
  }
  .example-main header {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 32px;
  }
  .example-main p {
    color: var(--biss-muted);
    font-size: 13.5px;
  }
  .example-menu {
    display: none;
  }
  @media (max-width: 760px) {
    .example-menu {
      display: inline-flex;
    }
  }
</style>
