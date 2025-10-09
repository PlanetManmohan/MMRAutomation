import { expect, Locator, Page } from "@playwright/test";
import Common, { Operation } from './Common';

export default class TerminalList {

    private page: Page;
    private common: Common;

    constructor(page: Page) {
        this.page = page;
        this.common = new Common(this.page);
    }

    //#region Locator
    private search = () => this.page.getByPlaceholder('Search');

    private BIC = () => this.page.locator('#BICInput');
    private btnVerify = () => this.page.locator('#VB0');
    private resultTable = () => this.page.locator('#dtgTerminal')
    private columnButton = () => this.page.getByRole('button', { name: 'Columns' });
    private columnCheckbox = (columnName: string) => this.page.getByRole('checkbox', { name: columnName });
    private exportData = () => this.page.getByRole('button', { name: 'Export' })
    //#endregion

    async goto() {
        await this.page.goto('/#/Terminal');
    }

    async FilterTerminalList(searchString: string) {
        await this.search().fill(searchString);
        await this.page.keyboard.press('Enter');
        
        //wait for loading symbol to disappear
        await this.page.waitForLoadState('networkidle');
    }

    async VerifyColumnCount(ColumnCount: number) {
        expect(await this.common.getTotalColumnCount(this.resultTable())).toEqual(ColumnCount);
    }

    async VerifyColumnPresent(Columns: string[]) {
        await this.common.verifyColumnPresent(this.resultTable(), Columns)
    }

    async AddColumn(columns: string[]) {
        await this.columnButton().click();

        for (const element of columns) {
            if (await this.columnCheckbox(element).isChecked())
                await this.columnCheckbox(element).check();
        };

        await this.columnButton().click();
        await this.common.verifyColumnPresent(this.resultTable(), columns)
    }

    async RemoveColumn(columns: string[]) {
        await this.columnButton().click();

        for (const element of columns) {
            if (await this.columnCheckbox(element).isChecked())
                await this.columnCheckbox(element).uncheck();
        };

        await this.columnButton().click();
        await this.common.verifyColumnNOTPresent(this.resultTable(), columns)
    }

    async CannotRemoveAllColumn(columns: string[]) {
        await this.columnButton().click();

        for (const element of columns) {
            if (await this.columnCheckbox(element).isChecked())
                await this.columnCheckbox(element).uncheck();
        };

        // Verify that checked items are disabled
        const checkedItems = await this.page.getByRole('checkbox', { checked: true }).all();
        for (const element of checkedItems) {
            await expect(element).toBeDisabled();
        }
        expect(checkedItems.length).toEqual(3);
    }

    async VerifyTIDTableRowCount(RowCount: number) {
        expect(await this.resultTable().locator('tbody').filter({ has: this.page.locator('tr') }).count() + 1).toEqual(RowCount);
    }

    async AllRowSameValue(Column: string, Value: string) {
        await this.common.AllRowContainsSameValue(this.resultTable(), Column, Value);
    }

    async ExportAndValidateColumns(expectedColumns: string[]) {
        // Set up download listener
        const downloadPromise = this.page.waitForEvent('download');

        await this.RemoveAllColumnExcept(expectedColumns);
        await this.page.waitForLoadState('networkidle');

        // Click export button
        await this.exportData().click();

        // Wait for download
        const download = await downloadPromise;
        const path = await download.path();

        // Read CSV content (assuming it's a small file)
        const csvContent = await require('fs').promises.readFile(path, 'utf-8');
        const [headerRow] = csvContent.split('\n');
        const actualColumns = headerRow.split(',').map(col => col.trim().replace(/"/g, ''));

        // Verify all expected columns are present
        for (const column of expectedColumns) {
            expect(actualColumns).toContain(column);
        }
        return path;
    }

    async RemoveAllColumnExcept(expectedCols: string[]) {
        let removeCols: string[] = [];
        let allcols = await this.common.getColumnNames(this.resultTable());
        
        allcols.forEach(element => {
            if (!expectedCols.includes(element)) {
                removeCols.push(element);
            }
        });
        await this.RemoveColumn(removeCols);
    }

}