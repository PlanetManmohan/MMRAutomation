import { expect, Locator, Page } from "@playwright/test";
import assert from "assert";
import { error, log } from "console";
import { MerchantProperties, ModelDialogButton } from "./Variables";

export enum Operation {
    Select,
    VerifyExist
}

export default class Common {

    private page: Page;
    ModelButton: any;


    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    footer = () => this.page.locator('footer');

    //#region Model dialog
    private ModelDialog = () => this.page.locator('.modal-dialog ').first();
    private ModelDialogHeading = () => this.page.locator('.modal-content').getByRole('heading');
    private ModelDialogHMessage = () => this.page.locator('.modal-content').locator('.panel-body');
    private ModelDialogOKButton = (buttonText: string) => this.page.locator('.modal-content').locator('button', { hasText: buttonText });

    //#endregion

    //drow down
    private dropdown = (id: string) => this.page.locator(id);
    private dropdownText = (id: string) => this.page.locator(id).locator('//span[2]');
    private dropdownInput = (id: string) => this.page.locator(id).getByRole('searchbox', { name: 'Select box' })
    private dropdownOption = (currencyoptino: string) => this.page.getByRole('option', { name: currencyoptino/*'Aruban Guilder AWG'*/ }).locator('span').first()

    async MenuOperation(Menu: String, Operation: Operation) {

        let MenuArray = Menu.split('~');

        let menu: Locator;

        menu = this.page.locator(".menu-title", { hasText: MenuArray[0] },).locator('xpath=../..');
        await menu.click();
        /* working login except back to back call for expandable menu, delete after 01/11/2025
                if (MenuArray.length > 1) {
                    await menu.getByTitle(MenuArray[1], { exact: true }).click();
                }
        
                if (MenuArray.length > 2) {
                    await menu.getByTitle(MenuArray[2]).click();
                }
        */

        if (MenuArray.length > 1) {
            if (MenuArray.length > 2) {
                const name = await menu.getByTitle(MenuArray[1], { exact: true }).locator('..').getAttribute('class')
                console.log('class value is:' + name + ':');
                if (name != 'active') {//condition to check collapes parent menu
                    await menu.getByTitle(MenuArray[1], { exact: true }).click();
                    console.log('clicked');
                }
            } else
                await menu.getByTitle(MenuArray[1], { exact: true }).click();


            //page.locator("div").evaluate("node => node.className")
        }

        if (MenuArray.length > 2) {



            await menu.getByTitle(MenuArray[2]).click();


        }
    }

    //working for merchant operations
    async ModelDialogOperation(heading: string, message: string, button: string) {
        await expect(this.ModelDialog()).toBeVisible({ timeout: 10000 });
        if (heading !== "")
            expect(await this.ModelDialogHeading().innerText()).toBe(heading);

        if (message !== "")
            expect(await this.ModelDialogHMessage().innerText()).toBe(message);


        //await this.ModelDialog().click();
        //await expect(this.page.getByRole('dialog')).toBeVisible());


        await this.ModelDialogOKButton(button).click();
        // if (button !== ModelDialogButton.No)  //'Please wait does not appear on No clicking'
        //     await this.WaitForPageLoad();

        await expect(this.ModelDialog()).toBeHidden({ timeout: 10000 });

    }

    async ModelDialogOperation_Error(heading: string, message: string, button: string) {
        await expect(this.ModelDialog()).toBeVisible({ timeout: 10000 });
        if (heading !== "")
            expect(await this.ModelDialogHeading().innerText()).toBe(heading);

        if (message !== "")
            expect(await this.ModelDialogHMessage().innerText()).toContain(message);


        //await this.ModelDialog().click();
        //await expect(this.page.getByRole('dialog')).toBeVisible());


        await this.ModelDialogOKButton(button).click();
        // if (button !== ModelDialogButton.No)  //'Please wait does not appear on No clicking'
        //     await this.WaitForPageLoad();

        await expect(this.ModelDialog()).toBeHidden({ timeout: 10000 });

    }

    async WaitForPageLoad() {
        //all commented code working
        let s = '#store-application-histirical-detail-panel';
        let c = 'cg-busy cg-busy-animation ng-scope ng-hide';

        await expect(this.page.locator('div:nth-child(3) > .cg-busy-default-wrapper > .cg-busy-default-sign')).toBeVisible({ timeout: 10000 });
        // await expect(page.locator(s).getByText('Please wait...').nth(1)).toBeVisible({timeout:10000});
        // console.log(await page.locator(s).getByText('Please wait...').nth(1).isVisible());
        // await expect(page.locator(s).getByText('Please wait...').nth(1).locator('..').locator('..').locator('..')).toHaveClass(c,{timeout:10000});
        await expect(this.page.locator('div:nth-child(3) > .cg-busy-default-wrapper > .cg-busy-default-sign')).toBeHidden({ timeout: 120000 });
        // console.log(await this.page.locator(s).getByText('Please wait...').nth(1).isVisible());
        // await this.page.waitForSelector('.cg-busy cg-busy-animation ng-scope', { state: 'hidden' });
        // await this.page.locator('.cg-busy cg-busy-animation ng-scope').waitFor({state:'detached'});
    }

    async VerifyFooterText(expectedVersion: string) {

        let s = await this.footer().textContent();

        if (s != null) {
            const version = s.substring(s.indexOf(' ') + 1, s.indexOf(' |'));
            const build = s.substring(s.indexOf('Build: ') + 7, s.lastIndexOf(' |'));
            const computerName = s.substring(s.indexOf('Computer Name: ') + 15);

            console.log('Version: ' + version);
            console.log('Build : ' + build);
            console.log('Computer : ' + computerName);

            assert.equal(version, expectedVersion);
        } else
            assert.fail('Verion not found in footer');
    }

    async FillDropDown(id: string, value: string) {
        await this.dropdown(id).click();
        await this.dropdownInput(id).fill(value);
        await this.dropdownOption(value).click();
        await expect(this.dropdownText(id)).toContainText(value, { ignoreCase: true });
    }

    async FillDropDown1(id: string, value: string) {
        await this.dropdown(id).click();
        //await this.dropdownInput(id).fill(value);
        //await this.dropdownOption(value).click();
        await this.dropdown(id).selectOption(value);

        //await this.dropdown(id).selectOption('Fraud Checke');
        //await expect(this.dropdown(id)).(value);
    }

    async getColumnNumber(table: Locator, columnname: string) {
        let columns = table.locator('//th');
        //let d = await columns.count();
        let colCount = await columns.count();
        for (let col = 0; col < colCount; col++) {//improve
            if (await columns.nth(col).textContent() == columnname)
                return col;
        }
        throw error('Column not found ' + columnname); //column not found in table
    }

    async getTotalColumnCount(table: Locator) {
        return table.locator('th').count();
    }

    async getTotalRowCount(table: Locator) {
        return table.locator('tr').count();
    }

    async verifyColumnPresent(table: Locator, columns: string[]) {
        let cols = table.locator('th');
        if (await cols.count() == columns.length) {
            for (const col of columns) {
                await expect(table.locator('th', { hasText: col })).toBeVisible();
            };
        }

    }

    async GetCellValue(table: Locator, column: string, rowValue: string): Promise<string> {
        let cols = table.locator('th');
        let colNo = await this.getColumnNumber(table, column);
        let row = table.locator('//tr').filter({ hasText: rowValue });
        return (await row.locator('//td').nth(colNo).textContent()) ?? "";
    }

    static async GetTimestamp(): Promise<string> {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(now.getFullYear());

        const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
        const customTime = Math.floor(minutesSinceMidnight / 10); // e.g., 444 for 7:24 PM

        return `${day}${month}${year}_${customTime}`;
    }

    async AllRowContainsSameValue(table: Locator, column: string, value: string){

        let colNo = await this.getColumnNumber(table, column)
        console.log('Column no is:' + colNo);
        for (const row of await table.locator("//tbody//tr").all()) {
            await expect(row.locator('//td').nth(colNo), `All rows have ${column} value as ${value}`).toContainText(value);
        };
    }
}