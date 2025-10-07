
import test, { Browser, BrowserContext, Page, chromium, expect } from '@playwright/test';
import { before, beforeEach, describe } from 'node:test';
import Env from '../Utils/Environment';
import Common from '../Pages/Common';
import DashboardPage from '../Pages/Dashboard.page';
import MerchantList from '../Pages/MerchantList.page';



test.describe("Basic tests", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let d: DashboardPage;
    let common: Common;
    let merchant: MerchantList;


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
        await page.goto('https://mmr-QA.fintrax.com/');

    })

    test('has title', async () => {
        const title = await page.title();
        console.log(title);
        expect(title).toBe("MMR");
    })

});

test.describe("Demo QA", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeEach(async () => {
        browser = await chromium.launch({
            headless: false,
            //channel : "msedge"//"chrome"

        });

        context = await browser.newContext({
            /*recordVideo:{
                dir:"./videos/",
  
            }*/
        });
        page = await context.newPage();
        await page.goto("https://demoqa.com/");
    })

    test('upload', async () => {

        await page.goto("https://demoqa.com/upload-download");

        const filepath0 = "C:\\Automation\\MMR\\UploadFile.txt";

        await page.setInputFiles("#uploadFile", filepath0);

        await page.screenshot({ path: 'screenshot.png' })
    })

});
