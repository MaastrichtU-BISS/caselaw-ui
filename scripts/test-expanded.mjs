import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
import { expect } from '@playwright/test';
export async function testExpanded(page, width) {
  const demo = (name) => page.locator(`[data-demo="${name}"]`);
  const output = page.locator('[data-result]');
  const accessibility = async (selector, state) => {
    const results = await new AxeBuilder({ page })
      .include(selector)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    await writeFile(
      `artifacts/${process.env.SVELTE ? 'svelte-' : ''}${width}-${state}-accessibility.json`,
      JSON.stringify(results.violations, null, 2),
    );
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  };
  const overlays = demo('Overlays and menus');
  const trigger = overlays.getByRole('button', { name: 'Project actions', exact: true });
  await trigger.click();
  const menu = page.locator('.biss-floating:popover-open');
  await accessibility('.biss-floating:popover-open', 'menu');
  await menu.getByRole('textbox', { name: 'Search actions' }).fill('missing');
  await expect(menu.getByText('No matching actions')).toBeVisible();
  await menu.getByRole('textbox').fill('');
  await menu.getByRole('textbox').press('ArrowDown');
  await expect(menu.getByRole('menuitem', { name: 'Export' })).toBeFocused();
  await menu.getByRole('menuitem', { name: 'Export' }).press('Enter');
  await menu.getByRole('menuitem', { name: 'CSV file' }).click();
  await expect(output).toHaveText('csv');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(page.locator('.biss-floating:popover-open')).toHaveCount(0);
  await overlays.getByRole('button', { name: 'Project details', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Project details' })).toBeVisible();
  await page.locator('.expanded-catalog>h2').click();
  await expect(page.locator('.biss-floating:popover-open')).toHaveCount(0);
  await overlays.getByRole('button', { name: 'Open dialog', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Edit research project' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toBeFocused();
  await accessibility('[role=dialog]', 'dialog:modal');
  await dialog.getByRole('button', { name: 'Nested dialog actions' }).click();
  await page
    .locator('.biss-floating:popover-open')
    .getByRole('menuitem', { name: 'Rename' })
    .click();
  await expect(output).toHaveText('rename');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Done', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(overlays.getByRole('button', { name: 'Open dialog', exact: true })).toBeFocused();
  await overlays.getByRole('button', { name: 'Open side panel', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Project record' })).toBeVisible();
  await page
    .getByRole('dialog', { name: 'Project record' })
    .getByRole('button', { name: 'Close', exact: true })
    .click();
  await overlays.getByRole('button', { name: 'Open search', exact: true }).click();
  const search = page.getByRole('dialog', { name: 'Search', exact: true });
  await search.getByRole('textbox').fill('justice');
  await search.getByRole('textbox').press('ArrowDown');
  await expect(search.getByRole('button', { name: 'Open justice' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(output).toHaveText('open-justice');
  await expect(search).not.toBeVisible();
  const pickers = demo('Pickers and filters');
  await pickers.getByRole('button', { name: 'Choose team', exact: true }).click();
  const list = page.locator('.biss-floating:popover-open');
  await expect(list.getByRole('option', { name: 'Archived', exact: true })).toBeDisabled();
  await list.getByRole('textbox').fill('Opera');
  await list.getByRole('textbox').press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(pickers).toContainText('Team: operations');
  await pickers.getByRole('button', { name: 'Group color', exact: true }).click();
  await page
    .locator('.biss-floating:popover-open')
    .getByRole('button', { name: 'Violet', exact: true })
    .click();
  await expect(pickers).toContainText('Color: violet');
  await pickers.getByRole('checkbox', { name: 'Operations' }).check();
  await expect(pickers).toContainText('Selected: research, operations');
  await pickers.getByRole('button', { name: 'Is not', exact: true }).click();
  await expect(pickers).toContainText('Negate: true');
  const dates = demo('Dates and ranges');
  const grid = dates.getByRole('grid', { name: 'Choose date', exact: true });
  const selected = grid.getByRole('button', { name: '12 November 2026', exact: true });
  await selected.focus();
  await selected.press('ArrowRight');
  await expect(grid.getByRole('button', { name: '13 November 2026', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(grid.getByRole('gridcell', { selected: true })).toContainText('13');
  const range = dates.getByRole('grid', { name: 'Project date range' });
  await range.getByRole('button', { name: '20 November 2026', exact: true }).click();
  await range.getByRole('button', { name: '16 November 2026', exact: true }).click();
  await expect(dates).toContainText('Range: 2026-11-16 → 2026-11-20');
  const typed = dates.getByRole('textbox', { name: 'Type a date' }).first();
  await typed.fill('31-02-2026');
  await expect(typed).toHaveAttribute('aria-invalid', 'true');
  await typed.fill('tomorrow');
  await typed.press('Enter');
  await expect(grid.getByRole('gridcell', { selected: true })).toContainText('13');
  const toolbar = demo('Toolbar and inline editing');
  await toolbar.getByRole('button', { name: 'Edit project title' }).click();
  await toolbar.getByRole('textbox', { name: 'Edit project title' }).fill('Renamed project');
  await toolbar.getByRole('textbox', { name: 'Edit project title' }).press('Escape');
  await expect(toolbar).toContainText('Title: Open justice');
  await toolbar.getByRole('button', { name: 'Edit project title' }).click();
  await toolbar.getByRole('textbox', { name: 'Edit project title' }).fill('Renamed project');
  await toolbar.getByRole('textbox', { name: 'Edit project title' }).press('Enter');
  await expect(toolbar).toContainText('Title: Renamed project');
  await toolbar.getByRole('button', { name: 'Find records', exact: true }).click();
  await toolbar.getByRole('textbox', { name: 'Find records', exact: true }).fill('data');
  await expect(toolbar).toContainText('Query: data');
  await toolbar.getByRole('button', { name: 'Clear search' }).click();
  await toolbar.getByRole('button', { name: 'Refresh data' }).click();
  await expect(output).toHaveText('refreshed');
  const table = demo('Table building blocks');
  await table.getByRole('button', { name: 'Project title' }).click();
  await expect(table.getByRole('columnheader', { name: 'Project title' })).toHaveAttribute(
    'aria-sort',
    'ascending',
  );
  await table.getByRole('button', { name: 'Research projects' }).click();
  await expect(table.getByRole('table')).not.toBeVisible();
  await table.getByRole('button', { name: 'Research projects' }).click();
  await table.getByRole('button', { name: 'Add research project' }).click();
  await expect(output).toHaveText('added row');
  const chart = demo('Charts');
  await chart.getByRole('button', { name: '2024 · Received: 20', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(output).toHaveText('received:0');
  const board = demo('Kanban');
  await board
    .getByRole('button', { name: 'Move to lane Review access policy', exact: true })
    .click();
  await page
    .locator('.biss-floating:popover-open')
    .getByRole('option', { name: 'Complete', exact: true })
    .click();
  await expect(
    board
      .locator('.biss-kanban-lane')
      .filter({ has: page.getByRole('heading', { name: 'Complete', exact: true }) }),
  ).toContainText('Review access policy');
  await expect(output).toHaveText('moved:done');
  await demo('Calendar').getByRole('button', { name: 'Publish dataset', exact: true }).click();
  await expect(output).toHaveText('publish');
  await demo('Timeline').getByRole('button', { name: 'Access review:', exact: false }).click();
  await expect(output).toHaveText('review');
  await demo('Onboarding and access').getByRole('checkbox', { name: 'Invite a teammate' }).check();
  await expect(
    demo('Onboarding and access').getByRole('checkbox', { name: 'Invite a teammate' }),
  ).toBeChecked();
  await expect(page.locator('body')).toHaveJSProperty(
    'scrollWidth',
    await page.evaluate(() => innerWidth),
  );
  await accessibility('.expanded-catalog', 'catalog');
  for (const name of [
    'Pickers and filters',
    'Dates and ranges',
    'Kanban',
    'Calendar',
    'Timeline',
  ]) {
    await demo(name).screenshot({
      path: `artifacts/${process.env.SVELTE ? 'svelte-' : ''}${width === 390 ? 'phone' : 'desktop'}-${name.toLowerCase().replaceAll(' ', '-')}.png`,
    });
  }
  await overlays.getByRole('button', { name: 'Open dialog', exact: true }).click();
  await page.screenshot({
    path: `artifacts/${process.env.SVELTE ? 'svelte-' : ''}${width === 390 ? 'phone' : 'desktop'}-dialog.png`,
  });
  await page.keyboard.press('Escape');
}
