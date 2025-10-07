import { expect, Locator, Page } from "@playwright/test";
import Common, { Operation } from './Common';

import Administration from "./Administration.page";


export default class VerifyIBANnBIC {


    private page: Page;
    private common: Common;
    private admin: Administration;

    constructor(page: Page) {
        this.page = page;
    }


    //#region Locator
    private IBNAInput = () => this.page.locator('#IBANInput');
    private BIC = () => this.page.locator('#BICInput');
    private btnVerify = () => this.page.locator('#VB0');
    private resultTable = () => this.page.locator('#resultsTable1')

    //#endregion

    async VerifyIBAN(IBAN: string) {
        this.common = new Common(this.page);
        await this.IBNAInput().fill(IBAN);

        await this.btnVerify().click();
    }

    async VerifyColumnCountForBIC(ColumnCount: number) {
        expect(await this.resultTable().locator('th').count()).toEqual(ColumnCount);

        this.common = new Common(this.page);
        await this.common.verifyColumnPresent(this.resultTable(), ['Field Name', 'Value', 'Status'])
    }

    async VerifyRowCountForBIC(RowCount: number) {
        expect(await this.resultTable().locator('tr').filter({ has: this.page.locator('td') }).count()).toEqual(RowCount);
    }

    /**
     * 
     * @param FieldName 
     * @param Value Verify value. If empty, it will verify that 'FieldName' is not visible
     * @param Status Status column value to verify
     */
    async verifySingleRowData(FieldName: string, Value: string, Status: string) {
        if (Value === '') {
            await expect(this.resultTable()
                .locator('//tr')
                .filter({ hasText: FieldName })
            ).not.toBeVisible();
        } else
            await expect(this.resultTable()
                .locator('//tr')
                .filter({ hasText: FieldName })
                .filter({ hasText: Value })
                .filter({ hasText: Status })
            ).toBeVisible();
    }

    async VerifyBIC(BIC: string) {
        this.common = new Common(this.page);
        //await this.IBNAInput().fill(IBAN);
        await this.BIC().fill(BIC);
        await this.btnVerify().click();



        //
        //expect(this.resultTable().locator('//th', { hasText: col }));




    }

    async UpdateVATWithError(VAT: string, expectedError: string = '') {



    }

    async columne() {

        this.common = new Common(this.page);
        //this.resultTable().
        let colCount = this.common.getTotalColumnCount(this.resultTable())
        expect(3).toEqual(colCount);


    }



}