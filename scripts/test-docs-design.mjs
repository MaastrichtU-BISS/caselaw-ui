import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
export async function testDocsDesign(page, base, width) {
  await page.goto(`${base}/#/components/dialog`);
  const navigation = page.getByRole('navigation', { name: 'Documentation', exact: true });
  if (width === 390) {
    const browse = page.getByRole('button', { name: 'Browse docs', exact: true });
    await browse.click();
    const search = page.getByRole('searchbox', { name: 'Find a component', exact: true });
    await expect(search).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('link', { name: 'Make it yours', exact: false })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(search).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(browse).toBeFocused();
    await expect(page.locator('.docs-sidebar')).not.toBeVisible();
    await browse.click();
  }
  await page.getByRole('searchbox', { name: 'Find a component', exact: true }).fill('');
  const overlays = navigation.getByRole('button', { name: /Overlays and search/ });
  await expect(overlays).toHaveAttribute('aria-expanded', 'true');
  await overlays.click();
  await expect(overlays).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation.getByRole('link', { name: 'Dialog', exact: true })).not.toBeVisible();
  const search = page.getByRole('searchbox', { name: 'Find a component', exact: true });
  await search.fill('dialog');
  await expect(navigation.getByRole('link', { name: 'Dialog', exact: true })).toBeVisible();
  await navigation.getByRole('link', { name: 'Dialog', exact: true }).click();
  await search.fill('');
  if (width === 390 && (await page.locator('.docs-sidebar').isVisible()))
    await page.getByRole('button', { name: 'Browse docs' }).click();
  await page.getByRole('button', { name: 'Code', exact: true }).click();
  await expect(page.locator('.dialog-docs-code')).toContainText("from 'biss-ui/vue'");
  await page.getByRole('button', { name: 'Svelte', exact: true }).click();
  await expect(page.locator('.dialog-docs-code')).toContainText("from 'biss-ui/svelte'");
  await expect(page.getByRole('link', { name: /View source/ })).toHaveAttribute(
    'href',
    /src\/svelte\/BissDialog.svelte$/,
  );
  await page.getByRole('button', { name: 'Preview', exact: true }).click();
  if (width === 1440) {
    await page.getByRole('button', { name: 'Phone', exact: true }).click();
    await expect(page.locator('.dialog-docs-canvas')).toHaveClass(/is-phone/);
    await page.getByRole('button', { name: 'Desktop', exact: true }).click();
    await page.getByRole('link', { name: 'API', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'API by part', exact: true })).toBeInViewport();
    await expect(page.getByRole('link', { name: 'API', exact: true })).toHaveAttribute(
      'aria-current',
      'location',
    );
    await page.getByRole('link', { name: 'Preview', exact: true }).click();
  }
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', width);
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(scan.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
  await page.screenshot({ path: `artifacts/docs/redesign-dialog-${width}.png`, fullPage: true });
  await page.goto(`${base}/#/components`);
  const filter = page.getByRole('searchbox', { name: 'Search component catalogue', exact: true });
  await filter.fill('xyz-no-component');
  await expect(page.getByRole('status')).toContainText('No components match');
  await filter.fill('dialog');
  await expect(page.locator('.component-row').filter({ hasText: 'Button' })).toHaveCount(0);
  await expect(page.locator('.component-row').filter({ hasText: 'Confirm Dialog' })).toBeVisible();
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', width);
  console.log(
    `Docs design at ${width}px: navigation, search, focus, TOC, source views, catalogue and accessibility passed.`,
  );
}
