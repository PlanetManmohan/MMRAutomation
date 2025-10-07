import { expect, Locator, Page } from "@playwright/test";
import Common, { Operation } from './Common';

import Administration from "./Administration.page";


export default class TerminalList {


    private page: Page;
    private common: Common;
    private admin: Administration;

    constructor(page: Page) {
        this.page = page;
    }


    //#region Locator
    private search = () => this.page.getByPlaceholder('Search');

    private BIC = () => this.page.locator('#BICInput');
    private btnVerify = () => this.page.locator('#VB0');
    private resultTable = () => this.page.locator('#dtgTerminal')

    //#endregion

    async goto() {
        await this.page.goto('/#/Terminal');
    }

    async FilterTerminalList(searchString: string) {
        this.common = new Common(this.page);
        await this.search().fill(searchString);
        await this.page.keyboard.press('Enter');
        //wait for loading symbol to disappear
        //this.common.WaitForPageLoad();
        await this.page.waitForLoadState('networkidle');
    }

    async VerifyColumnCountForBIC(ColumnCount: number) {
        expect(await this.resultTable().locator('th').count()).toEqual(ColumnCount);

        this.common = new Common(this.page);
        await this.common.verifyColumnPresent(this.resultTable(), ['Merchant', 'Address', 'MID', 'TID', 'Active', 'Terminal Type', 'Comms Type', 'Options'])
    }

    async VerifyTIDTableRowCount(RowCount: number) {
        expect(await this.resultTable().locator('tbody').filter({ has: this.page.locator('tr') }).count()+1).toEqual(RowCount);
    }

    async AllRowSameValue(Column: string,Value:string) {
        this.common = new Common(this.page);
        await this.common.AllRowContainsSameValue(this.resultTable(), Column,Value);        
    }



}