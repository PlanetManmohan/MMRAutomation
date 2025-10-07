import Env from '../../Utils/Environment';
import Common from '../../Pages/Common';
import DashboardPage from '../../Pages/Dashboard.page';
import { test, expect } from '../../Pages/HooksFixture';

let common: Common;

test('Dashboard content: customers', async ({ page, loginlogoutfixture }) => {
    let dd = new DashboardPage(page)
    await dd.goto();
    await dd.VerifyDashboardContent();
});

test('Verify title and footer(version, Build, System name)', async ({ page, loginlogoutfixture }) => {
    common = new Common(page);
    let dd = new DashboardPage(page)
    await dd.goto();
    await common.VerifyFooterText(Env.MMRVersion);


    //await test.step('UI test');
});

test('has MMR title', async ({ page, loginlogoutfixture }) => {
    let dd = new DashboardPage(page)
    await dd.goto();
    const title = await page.title();
    console.log(title);
    expect(title).toBe("MMR");
});

