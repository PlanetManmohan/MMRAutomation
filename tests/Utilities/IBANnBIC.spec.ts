//import test, { Page } from '@playwright/test';
//import Env from '../../Utils/Environment';
import VerifyIBANnBIC from '../../Pages/VerifyIBANnBIC';
import { test, expect } from '../../Pages/HooksFixture';

//export let page: Page
let verify: VerifyIBANnBIC;
const veirfyURL = '/#/Verify';

//test.describe.configure({ /*mode: 'serial'*/ /*, retries:1* as all retires together */ });

[
    { BIC: 'DEUTDEFF500', Status: 'Valid' },
    { BIC: 'DABADKKK', Status: 'Valid' },
    { BIC: 'WFBIUS6SELP', Status: 'Valid' },
    { BIC: 'WFBIUS6SELp', Status: 'Invalid: BIC contains lowercase characters' },
    { BIC: '333', Status: 'Invalid' },
].forEach(({ BIC, Status }) => {
    test(`Verify BIC [${BIC}] - [${Status}] `, async ({ page, loginlogoutfixture }) => {

        verify = new VerifyIBANnBIC(page);
        await page.goto(veirfyURL);
        await verify.VerifyBIC(BIC);
        await verify.verifySingleRowData('BIC format', BIC, Status);
    });

});

[
    { BIC: 'WFBIUS6SELP', ColumnCount: 3, RowCount: 1 }
].forEach(({ BIC, ColumnCount, RowCount }) => {
    test(`Verify BIC result column count [${ColumnCount}] and row count [${RowCount}] `, async ({ page, loginlogoutfixture }) => {

        await page.goto(veirfyURL);
        verify = new VerifyIBANnBIC(page);
        await verify.VerifyBIC(BIC);
        await verify.VerifyColumnCountForBIC(ColumnCount);
        await verify.VerifyRowCountForBIC(RowCount);
    });

});

[
    { IBAN: 'NO8330001234567', Status: 'Valid', Checksum: '83', countryOrigin: 'Norway', Bankcode: '3000', AccNo: '123456', checkDigits: '7' },
    { IBAN: 'NL02ABNA0123456789', Status: 'Valid', Checksum: '02', countryOrigin: 'Netherlands', Bankcode: 'ABNA', AccNo: '0123456789', checkDigits: '' },
    { IBAN: 'MC5810096180790123456789085', Status: 'Valid', Checksum: '58', countryOrigin: 'Monaco', Bankcode: '10096', AccNo: '01234567890', checkDigits: '85' },
    { IBAN: 'NO83300012345sd', Status: 'Invalid: All characters in IBAN need to be upper case', Checksum: '', countryOrigin: '', Bankcode: '', AccNo: '', checkDigits: '' },

].forEach(({ IBAN, Status, Checksum, countryOrigin, Bankcode, AccNo, checkDigits }) => {
    test(`Verify IBAN [${IBAN}] - [${Status}] `, async ({ page, loginlogoutfixture }) => {

        verify = new VerifyIBANnBIC(page);
        await page.goto(veirfyURL);
        await verify.VerifyIBAN(IBAN);
        await verify.verifySingleRowData('IBAN format', IBAN, Status);
        await verify.verifySingleRowData('IBAN length', (Status.includes('Invalid') ? '' : IBAN.length.toString()), Status);
        await verify.verifySingleRowData('IBAN check-sum', Checksum, Status);
        await verify.verifySingleRowData('IBAN country of origin', countryOrigin, '');
        await verify.verifySingleRowData('Bank code', Bankcode, '');
        await verify.verifySingleRowData('Account number', AccNo, '');
        await verify.verifySingleRowData('Check digits', checkDigits, '');

        //await page.waitForTimeout(5000);
    });

    // [
    //     { IBAN: 'WFBIUS6jhdSELP', ColumnCount: 3, RowCount: 1 }
    // ].forEach(({ IBAN, ColumnCount, RowCount }) => {
    //     test(`Verify IBAN result column count [${ColumnCount}] and row count [${RowCount}]`, async ({ page, loginlogoutfixture }) => {

    //         await page.goto(veirfyURL);
    //         verify = new VerifyIBANnBIC(page);
    //         await verify.VerifyIBAN(IBAN);
    //         await verify.VerifyColumnCountForBIC(ColumnCount);
    //         await verify.VerifyRowCountForBIC(RowCount);
    //     });

    // });

});