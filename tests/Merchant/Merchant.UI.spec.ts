import test, { Browser, BrowserContext, Page, chromium, expect } from '@playwright/test';
import { before, beforeEach, describe } from 'node:test';
import DashboardPage from '../../Pages/Dashboard.page';
import Env from '../../Utils/Environment';
import Common, { Operation } from '../../Pages/Common';
import MenuList from '../../Pages/MenuList';
import MerchantList from '../../Pages/MerchantList.page';

let browser: Browser;
let context: BrowserContext;
export let page: Page;
let d: DashboardPage;
let common: Common;
let merchant: MerchantList;

let merchantListURL="https://mmr-qa.fintrax.com/#/Store";

test.beforeAll(async () => {
    browser = await chromium.launch({
        headless: false,
        channel: "chrome"//"chrome" //"msedge"

    });

    context = await browser.newContext({
        /*recordVideo:{
            dir:"./videos/",

        }*/
    });
    page = await context.newPage();
    //await page.goto("https://mmr-QA.fintrax.com/");
    await page.goto(merchantListURL);

})

test.describe("Basic tests", () => {

    test('has MMR title', async () => {
        const title = await page.title();
        console.log(title);
        expect(title).toBe("MMR");
    })

    test('Filter Merchant simple', async () => {

        merchant = new MerchantList(page);
        await merchant.GotoMerchantList();
        await merchant.FilterMerchant_Simple('Planet POS PMSL', 'Onboarding HO 1', 'Onboarding HO 1');

        await merchant.AnalyseResult();
        await page.screenshot({ path: 'Filter_merchant.png' })

        
    })

    

    test('Filter Merchant detailed', async () => {

        merchant = new MerchantList(page);
        await merchant.GotoMerchantList();
        await merchant.FilterMerchant_Detail('Planet POS PMSL', 'Onboarding HO 1', 'Onboarding HO 1', 'Euro EUR', 'Cyprus', 'ATM', 'JCB');

        await merchant.AnalyseResult();
        await page.screenshot({ path: 'filter merchant detailed.png' })

    })

    test('Apply and clear filter ', async () => {
        merchant = new MerchantList(page);
        await merchant.GotoMerchantList();
        await merchant.FilterMerchant_Simple('Planet POS PMSL', 'Onboarding HO 1', 'Onboarding HO 1');

        await merchant.AnalyseResult();

        await merchant.ClearFilter();
        await merchant.AnalyseResult();

        await page.screenshot({ path: 'clear Filter_merchant.png' });

    })

    test('Search record', async () => {
        merchant = new MerchantList(page);
        await merchant.GotoMerchantList();
        await merchant.Search('200220251');
        await page.waitForTimeout(2000);
        await merchant.AnalyseResult();
    })

});

test('Number of rows/records found', async () => {

    //let df = 'Showing 1 to 15 of 456 rows';
    let s = 'version: MMR_2.59.0 | © 2022 Planet Payment Group - Build: 2025-02-20T11:41:23+00:00 | Computer Name: vmmmrwebqa001';
    console.log('.' + s.substring(s.indexOf(' ') + 1, s.indexOf(' |')) + '.');
    console.log('.' + s.substring(s.indexOf('Build: ') + 7, s.lastIndexOf(' |')) + '.');
    console.log('.' + s.substring(s.indexOf('Computer Name: ') + 15));
    //await new Promise(()=>{});
})
