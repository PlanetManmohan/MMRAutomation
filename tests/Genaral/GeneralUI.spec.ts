import test, { Browser, BrowserContext, chromium, expect, Page } from '@playwright/test';
import Env from '../../Utils/Environment';
import Common, { Operation } from '../../Pages/Common';
import DashboardPage from '../../Pages/Dashboard.page';


let browser: Browser;
let context: BrowserContext;
export let page: Page;
let d: DashboardPage;
let common: Common;


test.beforeAll(async () => {
    browser = await chromium.launch({
        //headless: false,
        channel: "chrome"//"chrome" //"msedge"

    });

    context = await browser.newContext({
        /*recordVideo:{dir:"./videos/",}*/
    });
    page = await context.newPage();
    //await page.goto(Env.MMRPreProdURL);
    await page.goto(Env.MMRQaURL);

})



test('Dashboard centent: customers', async () => {
    let dd = new DashboardPage(page)
    await dd.VerifyDashboardContent();
});

test('Verify title and footer(version, Build, System name)', async () => {
    common = new Common(page);
    await common.VerifyFooterText(Env.MMRVersion);
   

    
    //await test.step('UI test');
})

