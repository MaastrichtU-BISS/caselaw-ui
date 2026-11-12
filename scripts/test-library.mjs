import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';
export async function testLibrary(page, width) {
  const at = (name) => page.locator(`[data-library="${name}"]`);
  const foundation=at('Foundation');
  const native=foundation.getByRole('textbox',{name:'Native project name',exact:true});
  await native.fill('Updated native value');
  assert.equal(await foundation.locator('[data-native-value]').innerText(),'Updated native value');
  const description=await native.getAttribute('aria-describedby');
  assert.equal(await page.locator('[id="'+description+'"]').innerText(),'Use a recognizable name.');
  await foundation.locator('a').click({force:true});
  assert.equal(await foundation.locator('[data-activations]').innerText(),'0');
  assert.equal(await foundation.locator('button[aria-busy=true]').isDisabled(),true);
  const widths=await foundation.locator('button').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().width));
  assert.ok(Math.abs(widths[0]-widths[1])<1,'Loading preserves button width');
  const grid = at('DataGrid');
  await grid.getByRole('checkbox', { name: 'Select open', exact: true }).check();
  assert.match(await grid.innerText(), /1 selected/);
  await grid.getByRole('button', { name: 'Project', exact: true }).click();
  assert.equal(
    (await grid.locator('tbody tr').first().innerText()).trim(),
    'Open justice\tResearch\tOn track',
  );
  await grid.getByRole('button', { name: 'Project', exact: true }).click();
  assert.match(await grid.locator('tbody tr').first().innerText(), /Public access/);
  const resize = grid.getByRole('button', { name: 'Resize Project', exact: true });
  const before = await resize.locator('..').evaluate((e) => e.getBoundingClientRect().width);
  await resize.focus();
  await page.keyboard.press('ArrowRight');
  const after = await resize.locator('..').evaluate((e) => e.getBoundingClientRect().width);
  assert.ok(after > before, 'keyboard resizes the column');
  await grid.getByRole('button', { name: 'Customize columns', exact: true }).click();
  await grid.getByRole('checkbox', { name: 'Show Team', exact: true }).uncheck();
  await page.keyboard.press('Escape');
  assert.equal(await grid.locator('thead th').count(), 3);
  const labels = at('LabelEditor');
  await labels.getByRole('button', { name: 'Add label', exact: true }).click();
  assert.equal(await labels.locator('.biss-editor-row').count(), 4);
  assert.equal(
    await labels.getByRole('button', { name: 'Remove Complete', exact: true }).isDisabled(),
    true,
  );
  await labels.getByRole('button', { name: 'Move up New label', exact: true }).click();
  assert.match(await labels.locator('.biss-editor-row').nth(2).innerText(), /New label/);
  const filters = at('FilterBuilder');
  await filters.getByRole('button', { name: 'Add filter', exact: true }).click();
  assert.equal(await filters.locator('.biss-filter-row').count(), 2);
  await filters.getByRole('button', { name: 'Remove filter', exact: true }).last().click();
  assert.equal(await filters.locator('.biss-filter-row').count(), 1);
  const share = at('SharePanel');
  await share.getByRole('textbox', { name: 'Email address', exact: true }).fill('team@example.org');
  await share.getByRole('button', { name: 'Invite', exact: true }).click();
  await page.getByText('Invitation requested', { exact: true }).waitFor();
  const role=share.getByRole('button',{name:'Role: Grace Hopper',exact:true});
  await role.click();await page.locator('.biss-floating:popover-open').getByRole('option',{name:'Can edit',exact:true}).click();
  assert.match(await role.innerText(),/Can edit/);
  const composer = at('CommentComposer');
  await composer.getByRole('textbox').fill('Ready for review');
  await composer.getByRole('button', { name: 'Post comment', exact: true }).click();
  await page.getByText('Comment submitted', { exact: true }).waitFor();
  const split = at('SplitPane').getByRole('separator');
  await split.focus();
  await page.keyboard.press('ArrowRight');
  assert.ok(Number(await split.getAttribute('aria-valuenow')) > 40);
  const widgets = at('WidgetGrid');
  await widgets.getByRole('button', { name: 'Move later Team capacity', exact: true }).click();
  assert.match(
    await widgets.locator('.biss-widget-grid>section').first().innerText(),
    /Research activity/,
  );
  const tasks = at('TaskList');
  await tasks
    .getByRole('checkbox', { name: 'Complete Review the methods section', exact: true })
    .check();
  assert.equal(await tasks.locator('[data-done=true]').count(), 2);
  const tooltip = at('Tooltip');
  const trigger = tooltip.getByRole('button');
  await trigger.hover();
  const tip = tooltip.getByRole('tooltip');
  await tip.waitFor({ state: 'visible' });
  await tip.hover();
  await page.waitForTimeout(180);
  assert.equal(await tip.isVisible(), true, 'tooltip remains hoverable');
  await trigger.focus();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(180);
  assert.equal(await tip.isVisible(), true, 'focused tooltip persists');
  await page.keyboard.press('Escape');
  assert.equal(await tip.isVisible(), false);
  const files = at('FilePicker').locator('input[type=file]');
  await files.setInputFiles({
    name: 'notes.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Research notes'),
  });
  assert.equal(await files.evaluate((e) => e.files[0].name), 'notes.txt');
  const button = page.getByRole('button', { name: 'New project', exact: true });
  const style = await button.evaluate((e) => ({
    height: getComputedStyle(e).height,
    weight: getComputedStyle(e).fontWeight,
  }));
  assert.equal(style.height, '32px');
  assert.equal(style.weight, '500');
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    `Library overflow at ${width}`,
  );
  const axe = await new AxeBuilder({ page })
    .include('.library-examples')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    [],
    'New library accessibility',
  );
  console.log(
    `Passed library editor, data grid, sharing, composition and accessibility checks at ${width}px.`,
  );
}
