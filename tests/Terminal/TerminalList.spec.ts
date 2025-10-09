//Validate Terminal List populates, filters, refresh, toggle, pagination, columns all as expected
import { text } from 'stream/consumers';
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

test('Terminal List - Verify table column', async ({ page, loginlogoutfixture }) => {
    terminal = new TerminalList(page);
    await terminal.goto();

    await terminal.VerifyColumnCount(8);
});

[
    { column: ['MID'] },
    { column: ['Terminal Type', 'Comms Type'] },
    { column: ['Address', 'MID', 'TID'] },
].forEach(({ column }) => {
    test(`Terminal List - Remove column [${column}]`, async ({ page, loginlogoutfixture }) => {
        terminal = new TerminalList(page);
        await terminal.goto();

        await terminal.VerifyColumnCount(8);
        await terminal.RemoveColumn(column);
        await terminal.VerifyColumnCount(8 - column.length);
    });
});

[
    { column: ['Terminal Type', 'Address', 'Comms Type', 'Address', 'MID', 'Options'] },
].forEach(({ column }) => {
    test(`Terminal List - Should have atleast 3 columns [${column}]`, async ({ page, loginlogoutfixture }) => {
        terminal = new TerminalList(page);
        await terminal.goto();

        await terminal.VerifyColumnCount(8);
        await terminal.CannotRemoveAllColumn(column);
    });
});

[
    { column: ['Terminal Type', 'Address', 'Comms Type', 'Address', 'MID', 'Options'] },
].forEach(({ column }) => {
    test(`Terminal List | Export data - columns are correct [${column}]`, async ({ page, loginlogoutfixture }) => {
        terminal = new TerminalList(page);
        await terminal.goto();

        await terminal.VerifyColumnCount(8);
        await terminal.RemoveAllColumnExcept(column);
        await terminal.ExportAndValidateColumns(column);
    });
});

[
    { exportColumns: ['Merchant', 'Terminal Type', 'Comms Type', 'Address', 'MID', 'TID', 'Active', 'Options'] },
    { exportColumns: ['Terminal Type', 'Address', 'Comms Type', 'Address', 'MID', 'Options'] },
    { exportColumns: ['Merchant', 'TID', 'MID', 'Active'] },
].forEach(({ exportColumns }) => {
    test(`Terminal List - Export data with columns [${exportColumns}] and verify CSV colums`, async ({ page, loginlogoutfixture }) => {
        terminal = new TerminalList(page);
        await terminal.goto();

        await terminal.RemoveAllColumnExcept(exportColumns);
        let path = await terminal.ExportAndValidateColumns(exportColumns);

        // Attach CSV to test report
        await test.info().attach('exported-data', {
            path: path,
            contentType: 'text/csv'
        });
    });
});

test.fixme(`Terminal List | Export data - export data with columns and verify CSV -----------content--------`, async ({ page, loginlogoutfixture }) => {

});