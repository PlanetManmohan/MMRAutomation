import test, { Browser, BrowserContext, Page, chromium, expect, webkit } from '@playwright/test';
import { before, beforeEach, describe } from 'node:test';
import DashboardPage from '../../Pages/Dashboard.page';
import Env from '../../Utils/Environment';
import Common, { Operation } from '../../Pages/Common';
import MenuList from '../../Pages/MenuList';
import MerchantList from '../../Pages/MerchantList.page';
import Merchant from '../../Pages/Merchant.page';
import TabList, { MerchantOperationActions, MerchantProperties } from '../../Pages/Variables';
import Administration from '../../Pages/Administration.page';
import FileImport from '../../Pages/FileImport.page';
import { exit } from 'process';
//import { page } from './MMR1.spec';


let browser: Browser;
let context: BrowserContext;
let page: Page;
let d: DashboardPage;
let common: Common;
let merchantList: MerchantList;
let merchant: Merchant;
let fileImport: FileImport;
let admin: Administration;
let MerchantInfo = new Map<string, string>();
// test.beforeAll(async () => {
//     browser = await chromium.launch({
//         //headless: false,
//         // channel: "chrome"//"chrome" //"msedge"

//     });

//     context = await browser.newContext({
//         //viewport: null,
//     });

//     //page = await context.newPage();
//     //await page.goto("await page.goto('https://mmr-qa.fintrax.com/');
// })



test.beforeEach(async ({ page }) => {

    //await page.goto(Env.MMRQaURL + '#/FileImport');
    //await page.goto(Env.MMRQaURL + '#/Store');
    await page.goto('https://mmr-qa.fintrax.com/#/Store/Details/76f8e2d8-17b9-4b6f-8439-7fd2b3045882');
    //common = new Common(page);
    //await common.WaitForPageLoad();

    //merchant = new Merchant(page);
    //await merchant.Actions('Edit Details');
    // MerchantInfo.set('no', '202509051');
    // MerchantInfo.set('na', 'PBTTEST2_61 5052251');

    // MerchantInfo.set('no', '202509051');
    // MerchantInfo.set('na', 'PBTTEST2_61 5052251');

    // MerchantInfo.set('no', '202505122');
    // MerchantInfo.set('na', 'April testing part 4');




    //await merchant.UpdateCountry('Spain');

});

test('event charges', async ({ page }) => {
    merchantList = new MerchantList(page);
    fileImport = new FileImport(page);

    merchant = new Merchant(page);
    common = new Common(page);
    //await common.WaitForPageLoad();

    await merchant.Actions('Edit Details');

    //await merchant.AddEventCharges(TabList.FeesAndCharges);

    await page.locator('#maintab').getByRole('link', { name: TabList.FeesAndCharges }).click();



});

test('import', async ({ page }) => {
    merchantList = new MerchantList(page);
    fileImport = new FileImport(page);
    merchant = new Merchant(page);
    common = new Common(page);
    //await merchantList.GotoMerchantList();
    await fileImport.ImportBF('Scandic', 'EPP Store Level 15250', 'EPP Store Level 15250', '');


    await page.waitForTimeout(5000);
    // exit();
    // await page.waitForTimeout(3000);
    // await merchantList.AnalyseResult();
    // //await page.waitForTimeout(5000);
    // await merchantList.SelectMerchant('ST 35225 AUTOMATION 3');

    // await common.WaitForPageLoad();
    // await merchant.Actions('Edit Details');

    // let modify = new Map<string, string>();
    // modify.set(MerchantProperties.LegalName, 'ST 35225 automation 1');
    // await merchant.Modify(modify);

    // await merchant.SaveChanges(true);

    // await merchant.VerifyPropertyValue(modify);
    // await page.screenshot({ path: 'Merchant trading and legal name.png' });
})


test('with approval: temp', async ({ page }) => {
    merchantList = new MerchantList(page);
    merchant = new Merchant(page);
    admin = new Administration(page);
    //await merchantList.GotoMerchantList();
    //await page.goto('https://mmr-qa.fintrax.com/#/Administration/MerchantOperationApprovals');
    //await admin.PerformAction(MerchantInfo.get('na')!, MerchantOperationActions.Reject)
    //await merchantList.GotoMerchantList();
    //sawait merchantList.Search('202503061');
    let baseFilepath = 'C:\\Users\\Manmohan.Patil\\OneDrive - Planet\\Documentos\\Automation\\MMR\\Utils\\';
    let baseFileName = 'Uploadbase_2.61.xlsx';
    let tempFilepath = 'C:\\Users\\Manmohan.Patil\\OneDrive - Planet\\Documentos\\Automation\\MMR\\Utils\\';
    let tempFileName = 'new.xlsx';

    // new Date().toLocaleString()
    // "11/10/2016, 11:49:36 AM"

    const fs = require('fs');

    // File destination.txt will be created or overwritten by default.
    fs.copyFile(baseFilepath + baseFileName, tempFilepath + tempFileName, (err: any) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    });

    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();

    // workbook.xlsx.readFile()
    //     .then(function () {
    //         var worksheet = workbook.getWorksheet(1);
    //         var row = worksheet.getRow(5);
    //         row.getCell(1).value = 5; // A5's value set to 5
    //         row.commit();
    //         return workbook.xlsx.writeFile('C:\\Users\\Manmohan.Patil\\OneDrive - Planet\\Documentos\\Automation\\MMR\\Utils\\new.xlsx');
    //     })



    //     var Excel = require('exceljs');
    // let filename = 'src/write.xlsx';
    // let workbook = new Excel.Workbook();
    // await workbook.xlsx.readFile(filename);
    // let worksheet = workbook.getWorksheet("Sheet1");
    // // header id name dob
    // let row = worksheet.getRow(3);
    // console.log(row);
    // row.getCell(1).value = 2;
    // row.getCell(2).value = 'test';
    // row.getCell(3).value = '12/09/1991';
    // row.commit();
    // workbook.xlsx.writeFile('src/write.xlsx');

    var Excel = require('exceljs');
    async function excelOp() {
        let workbook = new Excel.Workbook();
        workbook = await workbook.xlsx.readFile(tempFilepath + tempFileName); // replace question_39869739.xls with your file
        let worksheet = workbook.getWorksheet('Merchant Information'); // replace sheetname with actual sheet name
        worksheet.getRow('9').getCell('B').value = 'NewMerchant_'; // replace rowNumber and cellNumber with the row and cell you want to modify
        workbook.xlsx.writeFile(tempFilepath + tempFileName);
    }

    excelOp();

});

//working, next to make roburst
test('with approval: update dropdown:update currency', async ({ page }) => {
    merchantList = new MerchantList(page);
    merchant = new Merchant(page);
    common = new Common(page);
    admin = new Administration(page);
    //await merchantList.GotoMerchantList();
    await merchantList.Search(MerchantInfo.get('no')!);//202503061

    await page.waitForTimeout(3000);
    await merchantList.AnalyseResult();
    await merchantList.SelectMerchant(MerchantInfo.get('na')!);//ST 35225 AUTOMATION 3

    await expect(page.locator('button', { hasText: 'Actions' })).toBeVisible({ timeout: 15000 });

    await common.WaitForPageLoad();


    //await page.waitForTimeout(3000);
    await merchant.Actions('Edit Details');

    let modify = new Map<string, string>();
    modify.set(MerchantProperties.CurrencyCode, 'AWG');//AWG DZD
    //await page.locator('store-application-histirical-detail-panel div').filter({hasText:'Please wait...'}).waitFor({state:'detached'});

    //await page.waitForTimeout(3000);

    await merchant.Modify(modify);

    await merchant.SaveChanges(true);
    await merchant.ApprovePendingOperation(MerchantInfo.get('na')!, MerchantOperationActions.Approve);
    await page.goBack();

    // await common.WaitForPageLoad();

    // let modify = new Map<string, string>();
    // modify.set(MerchantProperties.CurrencyCode, 'HRK');//AWG DZD
    await merchant.VerifyPropertyValue(modify);

});

test.skip('Without approval: Merchant trading and legal name', async ({ page }) => {
    merchantList = new MerchantList(page);
    merchant = new Merchant(page);
    common = new Common(page);
    //await merchantList.GotoMerchantList();
    await merchantList.Search(MerchantInfo.get('no')!);

    await page.waitForTimeout(3000);
    await merchantList.AnalyseResult();
    //await page.waitForTimeout(5000);
    await merchantList.SelectMerchant('ST 35225 AUTOMATION 3');

    await common.WaitForPageLoad();
    await merchant.Actions('Edit Details');

    let modify = new Map<string, string>();
    modify.set(MerchantProperties.LegalName, 'ST 35225 automation 1');
    await merchant.Modify(modify);

    await merchant.SaveChanges(true);

    await merchant.VerifyPropertyValue(modify);
    await page.screenshot({ path: 'Merchant trading and legal name.png' });
})


