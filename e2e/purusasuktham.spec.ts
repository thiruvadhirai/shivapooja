import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/purusasuktham');
  // Wait for the async axios fetch to populate the table
  await expect(page.getByRole('columnheader', { name: 'Sanskrit' })).toBeVisible();
  await expect(page.locator('tbody tr').first()).not.toBeEmpty();
});

test('renders Sanskrit and Tamil columns by default', async ({ page }) => {
  await expect(page.getByRole('columnheader', { name: 'Sanskrit' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Tamil' })).toBeVisible();
});

test('hides Sanskrit column when toggled', async ({ page }) => {
  await page.getByRole('button', { name: 'Hide Sanskrit' }).click();
  await expect(page.getByRole('columnheader', { name: 'Sanskrit' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Show Sanskrit' })).toBeVisible();
});

test('swaps Tamil with Telugu', async ({ page }) => {
  await page.getByRole('button', { name: 'Show Telugu' }).click();
  await expect(page.getByRole('columnheader', { name: 'Telugu' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Tamil' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Show Tamil' })).toBeVisible();
});

test('YouTube player iframe is present', async ({ page }) => {
  await expect(page.locator('iframe[src*="youtube.com"]')).toBeVisible({ timeout: 10_000 });
});
