<script lang="ts">
  import { BissAvatar, BissIcon, BissNavItem, BissNavSection, BissSidebar } from 'biss-ui/svelte';

  let collapsed = $state(true);
</script>

<div class="example-app">
  <BissSidebar bind:collapsed label="Grants office">
    {#snippet brand(rail)}
      <span class="example-brand"><span aria-hidden="true">G</span>{#if !rail}<b>Grants office</b>{/if}</span>
    {/snippet}
    {#snippet children()}
      <BissNavSection heading="Funding">
        <BissNavItem label="Calls" href="#calls" active aria-current="page">{#snippet icon()}<BissIcon name="target" />{/snippet}</BissNavItem>
        <BissNavItem label="Applications" href="#applications" meta="7">{#snippet icon()}<BissIcon name="file" />{/snippet}</BissNavItem>
        <BissNavItem label="Awards" href="#awards">{#snippet icon()}<BissIcon name="star" />{/snippet}</BissNavItem>
        <BissNavItem label="Deadlines" href="#deadlines">{#snippet icon()}<BissIcon name="cal" />{/snippet}</BissNavItem>
      </BissNavSection>
    {/snippet}
    {#snippet footer()}
      <BissAvatar name="Grace Hopper" size={30} />
    {/snippet}
  </BissSidebar>
  <main class="example-main">
    <strong>Calls</strong>
    <p>{collapsed ? 'Collapsed to the rail. Use the toggle to expand it.' : 'Expanded.'}</p>
  </main>
</div>

<style>
  .example-app {
    display: flex;
    height: 460px;
    border: 1px solid var(--biss-border);
    border-radius: var(--biss-radius-lg);
    overflow: hidden;
    background: var(--biss-bg);
  }
  .example-brand {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    white-space: nowrap;
  }
  .example-brand > span {
    display: grid;
    place-items: center;
    flex: none;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: var(--biss-success);
    color: var(--biss-on-primary);
    font-weight: 700;
    font-size: 13px;
  }
  .example-main {
    flex: 1;
    min-width: 0;
    padding: 16px 20px;
  }
  .example-main p {
    color: var(--biss-muted);
    font-size: 13.5px;
  }
</style>
