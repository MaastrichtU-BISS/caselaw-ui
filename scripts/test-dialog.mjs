import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
export async function testDialogExamples(page, base, width) {
  for (const framework of ['vue', 'svelte']) {
    const openExample = async (id) => {
      await page.goto(`${base}/preview.html?example=${id}&framework=${framework}`);
      await page.locator('html[data-ready=true]').waitFor();
    };
    await openExample('basic');
    const trigger = page.getByRole('button', { name: 'Edit profile', exact: true });
    await expect(page.locator('button button')).toHaveCount(0);
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Edit profile', exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('textbox', { name: 'Display name', exact: true })).toBeFocused();
    const accessible = await new AxeBuilder({ page })
      .include('[role=dialog]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      accessible.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([]);
    await dialog.getByRole('button', { name: 'Save changes', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(dialog.getByRole('textbox')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.press('Space');
    await expect(dialog).toBeVisible();
    await page.locator('.biss-dialog-overlay').click({ position: { x: 4, y: 4 } });
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await openExample('controlled');
    await page.getByRole('button', { name: 'Create project', exact: true }).click();
    const form = page.getByRole('dialog', { name: 'New project', exact: true });
    await form.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(form.getByRole('textbox', { name: 'Project name', exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await form.getByRole('textbox', { name: 'Project name', exact: true }).fill('Connected dialog');
    await form.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(form).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveText('Created Connected dialog');
    await openExample('nested');
    await page.getByRole('button', { name: 'Open settings', exact: true }).click();
    const parent = page.getByRole('dialog', { name: 'Workspace settings', exact: true });
    await parent.getByRole('button', { name: 'Review permissions', exact: true }).click();
    const nested = page.getByRole('dialog', { name: 'Permissions', exact: true });
    await expect(nested).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nested).toHaveCount(0);
    await expect(parent).toBeVisible();
    await expect(
      parent.getByRole('button', { name: 'Review permissions', exact: true }),
    ).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(parent).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open settings', exact: true })).toBeFocused();
    await openExample('convenience');
    const quick = page.getByRole('button', { name: 'Open quick dialog', exact: true });
    await quick.click();
    await expect(page.getByRole('dialog', { name: 'Quick dialog', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(quick).toBeFocused();
    console.log(
      `Dialog ${framework} at ${width}px: composition, focus, outside/Escape, controlled validation, nesting, wrapper and accessibility passed.`,
    );
  }
}
