

import test, { Browser, BrowserContext, Page, chromium, expect, webkit } from '@playwright/test';
import Common, { Operation } from '../../Pages/Common';
import MenuList from '../../Pages/MenuList';
import Merchant from '../../Pages/Merchant.page';

let page: Page;
let common: Common;
let merchant: Merchant;

let merchantURL: string = 'https://mmr-qa.fintrax.com/#/Store/Details/e7fd8d98-cf3f-4fd9-9046-5adda66eb48d';


test.describe('Spain', () => {
    [
        { vat: 'EW123453w3', error: 'Vat Number EW123453w3 is not valid. VAT Number is 10 long. It should be 11. VAT Number has non alphanumeric or lower case characters. Prefix EW is invalid. It should be ES. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
        { vat: 'ES763451EW', error: 'Vat Number ES763451EW is not valid. VAT Number is 10 long. It should be 11. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
        { vat: 'ES12345678EW', error: 'Vat Number ES12345678EW is not valid. VAT Number is 12 long. It should be 11.' },
        { vat: 'ES123456788', error: 'Vat Number ES123456788 is not valid. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
        { vat: 'ES1234567W8', error: 'Vat Number ES1234567W8 is not valid. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
        { vat: 'ESW23456985', error: '' },
        { vat: 'ES82345698E', error: '' },
        { vat: 'EST2343698E', error: '' },
        { vat: 'n/a', error: '' },

    ].forEach(({ vat, error }) => {

        test(`VAT ${vat}`, async () => {
            merchant = new Merchant(page);

            if (!await merchant.MerchantInEditState()) {
                await merchant.Actions(MenuList.ActionEditDetail);
            }
            await merchant.UpdateVATWithError(vat, error);
        });

    });

    test.beforeAll(async ({ browser }) => {
        await selectCountry(browser, 'Spain')
    });

    test.afterAll(async () => {
        await page.close();
    });
});

async function selectCountry(browser: Browser, country: string): Promise<Page> {
    page = await browser.newPage();
    await page.goto(merchantURL);

    merchant = new Merchant(page);
    common = new Common(page);
    //await common.WaitForPageLoad();

    await merchant.Actions(MenuList.ActionEditDetail);

    await merchant.UpdateCountry(country);
    return page;
}

test.describe('Austria', () => {
    [
        { vat: 'At1234567', error: 'Vat Number At1234567 is not valid. VAT Number is 9 long. It should be 11. VAT Number has non alphanumeric or lower case characters. Prefix At is invalid. It should be AT. 3rd character of Vat Number for Austria should be U.' },
        { vat: 'ATU1234567', error: 'Vat Number ATU1234567 is not valid. VAT Number is 10 long. It should be 11.' },
        { vat: '1ATU2345678', error: 'Vat Number 1ATU2345678 is not valid. Prefix 1A is invalid. It should be AT. 3rd character of Vat Number for Austria should be U.' },
        { vat: 'AT1U2345678', error: 'Vat Number AT1U2345678 is not valid. 3rd character of Vat Number for Austria should be U.' },
        { vat: 'ATU12345678', error: '' },
        { vat: 'n/a', error: '' },
    ].forEach(({ vat, error }) => {
        test(`VAT ${vat}`, async () => {
            merchant = new Merchant(page);

            if (!await merchant.MerchantInEditState()) {
                await merchant.Actions(MenuList.ActionEditDetail);
            }

            await merchant.UpdateVATWithError(vat, error);
        });

    });

    test.beforeAll(async ({ browser }) => {
        await selectCountry(browser, 'Austria')
    });

    test.afterAll(async () => {
        await page.close();
    });
});

test.describe('Belgium', () => {

    [//Belgium
        { vat: 'bE123456789', error: 'Vat Number bE123456789 is not valid. VAT Number is 11 long. It should be 12. VAT Number has non alphanumeric or lower case characters. Prefix bE is invalid. It should be BE.' },
        { vat: '1BE123456789', error: 'Vat Number 1BE123456789 is not valid. Prefix 1B is invalid. It should be BE.' },
        { vat: 'BE123456789', error: 'Vat Number BE123456789 is not valid. VAT Number is 11 long. It should be 12.' },
        { vat: 'BE12345678901', error: 'Vat Number BE12345678901 is not valid. VAT Number is 13 long. It should be 12.' },
        { vat: 'BE1234567890', error: '' },
        { vat: 'N/A', error: '' },
    ].forEach(({ vat, error }) => {
        test(`VAT ${vat}`, async () => {
            merchant = new Merchant(page);

            if (!await merchant.MerchantInEditState()) {
                await merchant.Actions(MenuList.ActionEditDetail);
            }

            await merchant.UpdateVATWithError(vat, error);
        });
    });
    test.beforeAll(async ({ browser }) => {
        await selectCountry(browser, 'Belgium')
    });

    test.afterAll(async () => {
        await page.close();
    });
});

test.describe('Bulgaria', () => {
    [//Bulgaria
        { vat: 'bG12345689012', error: 'Vat Number bG12345689012 is not valid. VAT Number is 13 long. It should be 11 or 12. VAT Number has non alphanumeric or lower case characters. Prefix bG is invalid. It should be BG.' },
        { vat: '1234BG567890', error: 'Vat Number 1234BG567890 is not valid. Prefix 12 is invalid. It should be BG.' },
        { vat: 'BG12345678', error: 'Vat Number BG12345678 is not valid. VAT Number is 10 long. It should be 11 or 12.' },
        { vat: 'BG12345678901', error: 'Vat Number BG12345678901 is not valid. VAT Number is 13 long. It should be 11 or 12.' },
        { vat: 'BG123456789', error: '' },
        { vat: 'BG1234567890', error: '' },
        { vat: 'N/A', error: '' },
    ].forEach(({ vat, error }) => {
        test(`VAT ${vat}`, async () => {
            merchant = new Merchant(page);

            if (!await merchant.MerchantInEditState()) {
                await merchant.Actions(MenuList.ActionEditDetail);
            }

            await merchant.UpdateVATWithError(vat, error);
        });
    });
    test.beforeAll(async ({ browser }) => {
        await selectCountry(browser, 'Bulgaria')
    });

    test.afterAll(async () => {
        await page.close();
    });
});

test.describe('Croatia', () => {
    [//Bulgaria
        { vat: '234567890Hr', error: 'Vat Number 234567890Hr is not valid. VAT Number is 11 long. It should be 13. VAT Number has non alphanumeric or lower case characters. Prefix 23 is invalid. It should be HR.' },
        { vat: '1HR2345678901', error: 'Vat Number 1HR2345678901 is not valid. Prefix 1H is invalid. It should be HR.' },
        { vat: 'HR2345678901', error: 'Vat Number HR2345678901 is not valid. VAT Number is 12 long. It should be 13.' },
        { vat: 'hR23456789012', error: 'Vat Number hR23456789012 is not valid. VAT Number has non alphanumeric or lower case characters. Prefix hR is invalid. It should be HR.' },
        { vat: 'HR12345678901', error: '' },
        { vat: 'n/A', error: '' },
    ].forEach(({ vat, error }) => {
        test(`VAT ${vat}`, async () => {
            merchant = new Merchant(page);

            if (!await merchant.MerchantInEditState()) {
                await merchant.Actions(MenuList.ActionEditDetail);
            }

            await merchant.UpdateVATWithError(vat, error);
        });
    });
    test.beforeAll(async ({ browser }) => {
        await selectCountry(browser, 'Croatia')
    });

    test.afterAll(async () => {
        await page.close();
    });
});




// [//
//     { vat: '', error: '' },
//     { vat: '', error: '' },
//     { vat: '', error: '' },
//     { vat: '', error: '' },
//     { vat: '', error: '' },
//     { vat: '', error: '' },
// ].forEach(({ vat, error }) => {

// });

// [
//     { vat: 'EW123453w3', error: 'Vat Number EW123453w3 is not valid. VAT Number is 10 long. It should be 11. VAT Number has non alphanumeric or lower case characters. Prefix EW is invalid. It should be ES. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
//     { vat: 'ES763451EW', error: 'Vat Number ES763451EW is not valid. VAT Number is 10 long. It should be 11. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
//     { vat: 'ES12345678EW', error: 'Vat Number ES12345678EW is not valid. VAT Number is 12 long. It should be 11.' },
//     { vat: 'ES123456788', error: 'Vat Number ES123456788 is not valid. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
//     { vat: 'ES1234567W8', error: 'Vat Number ES1234567W8 is not valid. Vat Number for Spain should have alphabetical characters in 3rd position or last or both 3rd and last.' },
//     { vat: 'ESW23456985', error: '' },
//     { vat: 'ES82345698E', error: '' },
//     { vat: 'EST2343698E', error: '' },

// ].forEach(({ country, vat, error }) => {

//     test(`VAT validation ${vat}`, async () => {
//         merchantList = new MerchantList(page);
//         fileImport = new FileImport(page);
//         merchant = new Merchant(page);
//         common = new Common(page);


//         if (!await merchant.MerchantInEditState()) {
//             await merchant.Actions('Edit Details');
//         }
//         // await common.WaitForPageLoad();

//         // await merchant.Actions('Edit Details');

//         // await merchant.UpdateCountry(country);

//         await merchant.UpdateVATWithError(vat, error);
//         // if (error) {
//         //     await merchant.CancelEdit();
//         //     await common.WaitForPageLoad();
//         // }
//         //await page.waitForTimeout(5000);

//         //await page.pause();

//     });
// });