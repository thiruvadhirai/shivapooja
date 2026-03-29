import { test, expect } from '@playwright/test';

test('home page shows title and navigation links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Shiva Pooja' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Panchangam' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Purusa Suktham' })).toBeVisible();
});

test('Panchangam link navigates to /panchangam', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Panchangam' }).click();
  await expect(page).toHaveURL('/panchangam');
  await expect(page.getByRole('heading', { name: 'Panchangam' })).toBeVisible();
});

test('Purusa Suktham link navigates to /purusasuktham', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Purusa Suktham' }).click();
  await expect(page).toHaveURL('/purusasuktham');
});
