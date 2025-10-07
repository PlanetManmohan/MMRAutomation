import { test as baseTest } from '@playwright/test'

type MyHooksFixtures = {
    loginlogoutfixture: any;
}

export const test = baseTest.extend<MyHooksFixtures>({
    loginlogoutfixture: async ({ page }, use) => {

        test.info().annotations.push({
            type: 'start',
            description: new Date().toISOString(),
        });
        const loginlogoutfixture = undefined;
        //page = await browser.newPage();
        //await page.goto('/');

        await use(loginlogoutfixture);

        await page.close();
        test.info().annotations.push({
            type: "End",
            description: new Date().toISOString(),
        })
    }
})

export { expect } from '@playwright/test'