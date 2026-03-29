import { test, expect } from '@playwright/test';

test('panchangam page renders all 11 lines', async ({ page }) => {
  await page.goto('/panchangam');
  await expect(page.getByRole('heading', { name: 'Panchangam' })).toBeVisible();
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(11);
});

test('panchangam shows first and last lines', async ({ page }) => {
  await page.goto('/panchangam');
  await expect(page.getByText('Krouncha Dweepe')).toBeVisible();
  await expect(page.getByText('Pooram Nakshatre')).toBeVisible();
});
