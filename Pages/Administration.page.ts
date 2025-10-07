import { expect, Locator, Page } from "@playwright/test";
import { error } from "console";
import Common, { Operation } from './Common';
import MenuList from "./MenuList";
import { TIMEOUT } from "dns";
import { MerchantOperationActions, MerchantProperties, ModelDialogButton, ModelDialogHeading, ModelDialogMessage } from "./Variables";


enum Actions {
    Edit,
    AddMid,
}

export default class Administration {


    private page: Page;
    private common: Common;

    constructor(page) {
        this.page = page;

    }


    private OperationApproval = () => this.page.locator('#dgtMerchantOperationApproval');
    private Header = (i: number) => this.page.locator('#dgtMerchantOperationApproval').locator('/thead/tr/th').nth(i);
    private RowWithMerchantName = (row: number) => this.page.locator('#dgtMerchantOperationApproval').locator('//tbody/tr[' + row + ']/td[3]');
    private ActionWithMerchantName = (row: number, action: string) =>
        this.page.locator('#dgtMerchantOperationApproval').locator('//tbody/tr[' + row + ']').getByText(action);
    private PendingOperation = () => this.page.getByRole('link', { name: 'Pending Operation' });
    private Save = () => this.page.getByRole('button', { name: 'Save' });
    private Cancel = () => this.page.getByRole('button', { name: 'Cancel' })


    //#region MerchantDetails

    //#endregion

    async GotoAdminPage() {

        throw new Error('Not implemented')
        this.common = new Common(this.page);
        await this.common.MenuOperation(MenuList.MerchantsList, Operation.Select);
    }

    async df(col: string, colValue: string) {
        col = 'Name';
        colValue = 'Auto';

        let found = false;
        //total columns
        for (let row = 1; row < 11; row++) {
            let s = await this.RowWithMerchantName(row).innerText();
            if ((s).trim().toLowerCase() == colValue.trim().toLowerCase()) {
                console.log('Found merchant in row ' + row);
                //tbody/tr[1]//a
                await this.ActionWithMerchantName(row, colValue).click();
                await this.common.ModelDialogOperation(ModelDialogHeading.ConfirmAction,
                    ModelDialogMessage.AreYouSureApprove, ModelDialogButton.Yes);
                if (colValue == MerchantOperationActions.Approve) {//'For approve, confirmation dialog will be displayed, need to OK on it'
                    await this.common.ModelDialogOperation(ModelDialogHeading.Info,
                        ModelDialogMessage.OperationApproved, ModelDialogButton.OK);
                }
                found = true;
                break;
            }
        }
    }
    async PerformAction(MerchantName: string, Action: string) {
        this.common = new Common(this.page);

        await this.page.waitForURL('**/Administration/MerchantOperationApprovals');
        //await this.ActionMenu().click();
        //await this.ActionMenuOptions(Action).click();

        await this.page.waitForTimeout(5000);

        let found = false;
        for (let row = 1; row < 11; row++) {
            let s = await this.RowWithMerchantName(row).innerText();
            if ((s).trim().toLowerCase() == MerchantName.trim().toLowerCase()) {
                console.log('Found merchant in row ' + row);
                //tbody/tr[1]//a
                await this.ActionWithMerchantName(row, Action).click();
                await this.common.ModelDialogOperation(ModelDialogHeading.ConfirmAction,
                    ModelDialogMessage.AreYouSureApprove, ModelDialogButton.Yes);
                if (Action == MerchantOperationActions.Approve) {//'For approve, confirmation dialog will be displayed, need to OK on it'
                    await this.common.ModelDialogOperation(ModelDialogHeading.Info,
                        ModelDialogMessage.OperationApproved, ModelDialogButton.OK);
                }
                found = true;
                break;
            }
        }
        if (!found) {
            //Name not found on first page. implement logic for clicking on next page and seach again
            throw new Error("Not found on first page");
            ;
        }

    }



    async WaitForPageLoad() {
        //all commented code working
        let s = '#store-application-histirical-detail-panel';
        let c = 'cg-busy cg-busy-animation ng-scope ng-hide';

        await expect(this.page.locator('div:nth-child(3) > .cg-busy-default-wrapper > .cg-busy-default-sign')).toBeVisible();
        // await expect(page.locator(s).getByText('Please wait...').nth(1)).toBeVisible({timeout:10000});
        // console.log(await page.locator(s).getByText('Please wait...').nth(1).isVisible());
        // await expect(page.locator(s).getByText('Please wait...').nth(1).locator('..').locator('..').locator('..')).toHaveClass(c,{timeout:10000});
        await expect(this.page.locator('div:nth-child(3) > .cg-busy-default-wrapper > .cg-busy-default-sign')).toBeHidden();
        // console.log(await this.page.locator(s).getByText('Please wait...').nth(1).isVisible());
        // await this.page.waitForSelector('.cg-busy cg-busy-animation ng-scope', { state: 'hidden' });
        // await this.page.locator('.cg-busy cg-busy-animation ng-scope').waitFor({state:'detached'});
    }
}