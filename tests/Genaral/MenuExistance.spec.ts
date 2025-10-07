import test, { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import Env from '../../Utils/Environment';
import Common, { Operation } from '../../Pages/Common';
import MenuList from '../../Pages/MenuList';

//let browser: Browser;
//let context: BrowserContext;
export let page: Page;
let common: Common;

test.beforeAll(async ({ browser }) => {
    // browser = await chromium.launch({
    //     //headless: false,
    //     channel: "chrome"//"chrome" //"msedge"

    // });

    // context = await browser.newContext({
    //     /*recordVideo:{
    //         dir:"./videos/",

    //     }*/
    // });
    page = await browser.newPage();
    await page.goto('/');

})


test('Menu verify: Acquirer', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.AcquirerCreate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AcquirerList, Operation.VerifyExist);

});

test('Menu verify: Customer', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.CustomersCreate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.CustomersList, Operation.VerifyExist);

});

test('Menu verify: Head office Groups', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.CustomersCreate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.CustomersList, Operation.VerifyExist);

});

test('Menu verify: Merchant', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.MerchantsList, Operation.VerifyExist);
    await common.MenuOperation(MenuList.MerchantsCreate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.MerchantsHistory, Operation.VerifyExist);
});

test('Menu verify: Terminal', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.CustomersCreate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.CustomersList, Operation.VerifyExist);

});

test('Menu verify: Reports', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.ReportReportLogos, Operation.VerifyExist);
    await common.MenuOperation(MenuList.ReportAPIConfig, Operation.VerifyExist);

});

test('Menu verify: Fees and charges ', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.FeesAndChargesRebate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.FeesAndChargesSalesAgents, Operation.VerifyExist);
    await common.MenuOperation(MenuList.FeesAndChargesServiceCharges, Operation.VerifyExist);


});

test('Menu verify: Utilities', async () => {

    common = new Common(page);
    await common.MenuOperation(MenuList.UtilitiesImportFile, Operation.VerifyExist);
    await common.MenuOperation(MenuList.UtilitiesViewAllFileImports, Operation.VerifyExist);
    await common.MenuOperation(MenuList.UtilitiesMmfJobs, Operation.VerifyExist);
    await common.MenuOperation(MenuList.UtilitiesVerifyIBANBIC, Operation.VerifyExist);
});

test('Menu verify: Contacts', async () => {
    common = new Common(page);
    await common.MenuOperation(MenuList.Contacts, Operation.VerifyExist);
});

test('Menu verify: Revenue Share', async () => {
    common = new Common(page);
    await common.MenuOperation(MenuList.RevenueSharePartners, Operation.VerifyExist);
    await common.MenuOperation(MenuList.RevenueShareShareMapList, Operation.VerifyExist);

});

test('Menu verify: Audit', async () => {
    common = new Common(page);
    await common.MenuOperation(MenuList.AuditUserAccessLog, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AuditApprovedActions, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AuditReports, Operation.VerifyExist);
});

test('Menu verify: Validations', async () => {
    common = new Common(page);
    await common.MenuOperation(MenuList.Validations, Operation.VerifyExist);
});

test('Menu verify: Administractions', async () => {
    common = new Common(page);
    await common.MenuOperation(MenuList.AdministrationOperationsDeactivateMerchantsTerminals, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationOperationsBulkPricingUpdate, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationOperationApprovals, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationOperationHistory, Operation.VerifyExist);
    //await common.MenuOperation(MenuList.AdministrationTasks, Operation.VerifyExist);
    //await common.MenuOperation(MenuList.AdministrationMIDAllocation, Operation.VerifyExist);

    await common.MenuOperation(MenuList.AdministrationViewAllUsers, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationConfigurationSettings, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationEmailNotifications, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationIntegrationsHealth, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationMasAcquirer, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationFundingAccount, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationFundingBankAccount, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationFundingAccountOin, Operation.VerifyExist);
    await common.MenuOperation(MenuList.AdministrationLegalEntity, Operation.VerifyExist);
});

test('Menu verify: Maintenance', async () => {
    common = new Common(page);
    await common.MenuOperation(MenuList.MaintenanceMerchantHierarchy, Operation.VerifyExist);
});

