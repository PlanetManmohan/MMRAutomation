//Validate Terminal List populates, filters, refresh, toggle, pagination, columns all as expected
import Common from '../../Pages/Common';
import { test, expect } from '../../Pages/HooksFixture';
import TerminalList from '../../Pages/TerminalList.page';

let terminal: TerminalList;
let common: Common;

test.describe.configure({ /*mode: 'serial'*/ /*, retries:1* as all retires together */ });

[
    { merchantName: 'ST 35225 AUTOMATION 33' },
    { merchantName: 'AUTOMATION' },

].forEach(({ merchantName }) => {
    test(`Terminal serach - Filter with merchant name [${merchantName}]`, async ({ page, loginlogoutfixture }) => {
        terminal = new TerminalList(page);
        terminal.goto();
        await terminal.FilterTerminalList(merchantName);

        await terminal.AllRowSameValue('Merchant', merchantName);
    });

});
[
    { MID: '202503061' },
].forEach(({ MID }) => {
    test(`Terminal search - Filter with MID [${MID}]`, async ({ page, loginlogoutfixture }) => {
        terminal = new TerminalList(page);
        terminal.goto();
        await terminal.FilterTerminalList(MID);

        await terminal.AllRowSameValue('MID', MID);
    });

    [
        { TID: 'A05214' },
    ].forEach(({ TID }) => {
        test(`Terminal search - Filter with TID [${TID}]`, async ({ page, loginlogoutfixture }) => {
            terminal = new TerminalList(page);
            terminal.goto();
            await terminal.FilterTerminalList(TID);

            await terminal.AllRowSameValue('TID', TID);
        });
    });
});

test.fixme('Terminal search - Filter with MID', async ({ page, loginlogoutfixture }) => {

});

[
    { TID: '202503061' },
].forEach(({ TID: merchantName }) => {
    test.fixme('Terminal search - Filter with TID', async ({ page, loginlogoutfixture }) => {

    });
});


test('Terminal List - Verify table column', async ({ page, loginlogoutfixture }) => {
    terminal = new TerminalList(page);
    await terminal.goto();
    
    await terminal.VerifyColumnCountForBIC(8);
});

