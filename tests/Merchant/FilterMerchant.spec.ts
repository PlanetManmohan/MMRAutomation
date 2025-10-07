import test, { expect, Page } from '@playwright/test';
import Env from '../../Utils/Environment';
import Common from '../../Pages/Common';
import MerchantList from '../../Pages/MerchantList.page';


let page: Page;
let common: Common;
let merchant: MerchantList;

test.describe.configure({ /*mode: 'serial'*/ /*, retries:1* as all retires together */ });
let merchantURL: string = Env.MMRQaURL + '#/Store';//'https://mmr-qa.fintrax.com/#/Store/Details/e7fd8d98-cf3f-4fd9-9046-5adda66eb48d';

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(merchantURL);

    common = new Common(page);
});

[
    { Acquirer: 'Planet POS PMSL', VerifyColumnName: 'Acquirer' },
    { Acquirer: 'Avolta', VerifyColumnName: 'Acquirer' },
    { Acquirer: 'PayByTech', VerifyColumnName: 'Acquirer' },
   
].forEach(({ Acquirer, VerifyColumnName }) => {
    test(`Filter MerchantList: Acquirer with [${Acquirer}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Simple(Acquirer, '', '');
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, Acquirer);
    });
});


[
    { Acquirer: 'Planet POS PMSL', Customer:'Store 202308031', VerifyColumnName: 'Customer' },
    { Acquirer: 'Avolta', Customer:'Avolta Regession HO Store Level', VerifyColumnName: 'Customer' },
    { Acquirer: 'PayByTech', Customer:'Nov_PBT_Test_5', VerifyColumnName: 'Customer' },
].forEach(({ Acquirer, Customer, VerifyColumnName }) => {
    test(`Filter MerchantList: Customer with [${Acquirer}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Simple(Acquirer, Customer, '');
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, Customer);
    });
});

[
    { Acquirer: 'Planet POS PMSL', Customer:'Store 202308031', Headoffice:'Store 202308031', VerifyColumnName: 'Headoffice' },
    { Acquirer: 'Avolta', Customer:'Avolta Regession HO Store Level', Headoffice:'Avolta Regession HO Store Level', VerifyColumnName: 'Headoffice' },
    { Acquirer: 'PayByTech', Customer:'Nov_PBT_Test_5', Headoffice:'Nov_PBT_Test_5', VerifyColumnName: 'Headoffice' },
].forEach(({ Acquirer, Customer, Headoffice, VerifyColumnName }) => {
    test(`Filter MerchantList: HeadOffice with [${Acquirer}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Simple(Acquirer, Customer, Headoffice);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, Headoffice);
    });
});

[
    { CreatedFrom: '03 February 2025' },
    { CreatedFrom: '25 October 2024' },
    { CreatedFrom: '15 July 2025' },
].forEach(({ CreatedFrom }) => {
    test.skip(`Filter MerchantList: Created From date [${CreatedFrom}]`, async () => {

        
    });
});

[
    { CreatedTo: '03 February 2025' },
    { CreatedTo: '25 October 2024' },
    { CreatedTo: '15 July 2025' },
].forEach(({ CreatedTo }) => {
    test.fixme(`Filter MerchantList: 'Created To' date [${CreatedTo}]`, async () => {

        
    });
});



[
    { Currency: 'Euro EUR', VerifyColumnName: 'Currency', VerifyValue: 'EUR' },
    { Currency: 'Swiss Franc CHF', VerifyColumnName: 'Currency', VerifyValue: 'CHF' },
    { Currency: 'NOK', VerifyColumnName: 'Currency', VerifyValue: 'NOK' },
].forEach(({ Currency, VerifyColumnName, VerifyValue }) => {
    test(`Filter MerchantList: Currency with [${Currency}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Detail('', '', '', Currency);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, VerifyValue);
    });
});


[
    { Channel: 'NORWAY', VerifyColumnName: 'Country'},
    { Channel: 'FRANCE', VerifyColumnName: 'Country' },
    { Channel: 'IRELAND', VerifyColumnName: 'Country'},
].forEach(({ Channel, VerifyColumnName }) => {
    test(`Filter MerchantList: Country with [${Channel}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Detail('', '', '', '',Channel);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, Channel);
    });
});

[
    { Channel: 'Ecommerce', VerifyColumnName: 'Channel'},
    { Channel: 'Instore', VerifyColumnName: 'Channel' },
    { Channel: 'ATM', VerifyColumnName: 'Channel'},
].forEach(({ Channel, VerifyColumnName }) => {
    test(`Filter MerchantList: Channel with [${Channel}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Detail('', '', '', '','',Channel);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, Channel);
    });
});

[
    { CardScheme: 'AMEX', VerifyColumnName: 'Card Scheme'},
    { CardScheme: 'MBWAY', VerifyColumnName: 'Card Scheme' },
    { CardScheme: 'VISA', VerifyColumnName: 'Card Scheme'},
].forEach(({ CardScheme, VerifyColumnName }) => {
    test(`Filter MerchantList: Card scheme with [${CardScheme}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Detail('', '', '', '','','',CardScheme);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, CardScheme);
    });
});

[
    { MCC: 'AMEX', VerifyColumnName: 'Card Scheme'},
    { MCC: 'MBWAY', VerifyColumnName: 'Card Scheme' },
    { MCC: 'VISA', VerifyColumnName: 'Card Scheme'},
].forEach(({ MCC, VerifyColumnName }) => {
    test.fail(`Filter MerchantList: 'MCC' with [${MCC}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Detail('', '', '', '','','',MCC);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, MCC);
    });
});

[
    { Status: 'Inactive', VerifyColumnName: 'MID'},
    { Status: 'Active', VerifyColumnName: 'MID' },
].forEach(({ Status, VerifyColumnName }) => {
    test.fail(`Filter MerchantList: 'Status' with [${Status}]`, async () => {

        merchant = new MerchantList(page);
        
        await merchant.FilterMerchant_Status(Status);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, Status);
    });
});

[
    { SearchFor: 'MID', SearchValue:'202308031', VerifyColumnName: 'MID'},
    { SearchFor: 'TID', SearchValue:'273202f', VerifyColumnName: 'TID' },
    { SearchFor: 'Name', SearchValue:'Nov_PBT_Test_5', VerifyColumnName: 'Name' },
].forEach(({ SearchFor, SearchValue, VerifyColumnName }) => {
    test.fail(`Filter MerchantList: 'Status' with [${SearchFor}]`, async () => {

        merchant = new MerchantList(page);
        
        await merchant.FilterMerchant_Search(SearchFor, SearchValue);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, SearchValue);
    });
});

[
    { DeviceGateway: 'PAX', VerifyColumnName: 'Card Scheme'},
    { DeviceGateway: 'Cybersource', VerifyColumnName: 'Card Scheme' },
    { DeviceGateway: 'Carpark', VerifyColumnName: 'Card Scheme'},
].forEach(({ DeviceGateway, VerifyColumnName }) => {
    test.fail(`Filter MerchantList: DeviceGateway with [${DeviceGateway}]`, async () => {

        merchant = new MerchantList(page);
        await merchant.FilterMerchant_Detail('', '', '', '','','',DeviceGateway);
        await merchant.AnalyseResult();

        await merchant.VerifyResult_SingleColumn(VerifyColumnName, DeviceGateway);
    });
});


test.afterEach(async () => {
    await page.close();
});


