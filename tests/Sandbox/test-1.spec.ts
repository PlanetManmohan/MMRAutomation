import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mmr-qa.fintrax.com/#/Store/List');
  await page.getByRole('link', { name: 'Merchants', exact: true }).click();
  await page.getByRole('link', { name: 'List' }).click();

  await page.getByText('Select Acquirer').click();//
  await page.getByText('CyberSource').click();

  await page.locator('#acquirerId').getByLabel('Select box clear').click();
  await page.locator('#acquirerId').getByLabel('Select box activate').click();
  await expect(page.locator('#page-content')).toMatchAriaSnapshot(`- link "Details"`);
  await page.getByRole('link', { name: 'Details' }).click();
 
  await page.getByRole('option', { name: 'ELAVON' }).locator('span').first().click();
  await page.locator('#acquirerId').getByLabel('Select box clear').click();
  await page.getByText('Select Acquirer').click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('planet pos pmsl');
  await page.getByRole('option', { name: 'Planet POS PMSL' }).locator('span').first().click();

  await page.goto('https://mmr-qa.fintrax.com/#/Store/List');

await page.getByRole('link', { name: 'Merchants', exact: true }).click();
await page.getByRole('link', { name: 'List' }).click();

await page.getByText('Showing 1 to 15 of 11537 rows').click();
await expect(page.locator('#customer-panel-collapse')).toContainText('Showing 1 to 15 of 11537 rows');
await page.getByRole('link', { name: 'Merchants', exact: true }).click();
await page.getByRole('link', { name: 'List' }).click();
await page.locator('#searchTextBox').click();
await page.locator('#searchTextBox').click();
await page.locator('#searchTextBox').fill('4334');
await page.getByRole('button', { name: 'Clear Filter' }).click();

await page.goto('https://mmr-qa.fintrax.com/');
await page.getByRole('cell', { name: 'ARION RETAIL GROUP COPENH …' }).click();
await page.goto('https://mmr-qa.fintrax.com/#/Store');






});

