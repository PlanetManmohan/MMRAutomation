import { expect, Locator, Page } from "@playwright/test";
import { error } from "console";
import Common, { Operation } from './Common';
import MenuList from "./MenuList";
import { TIMEOUT } from "dns";
import { MerchantOperationActions, MerchantProperties, ModelDialogButton, ModelDialogHeading, ModelDialogMessage } from "./Variables";
import Administration from "./Administration.page";


export default class Merchant {


    private page: Page;
    private common: Common;
    private admin: Administration;
    //private : Common;

    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    private Tab = (TabName: string) => this.page.locator('#maintab').getByRole('link', { name: TabName });

    private ActionMenu = () => this.page.locator('button', { hasText: 'Actions' });
    private PendingOperation = () => this.page.getByRole('link', { name: 'Pending Operation' });
    private ActionMenuOptions = (menu: string) => this.page.locator('.dropdown-menu').locator('li').locator('a', { hasText: menu });
    private Save = () => this.page.getByRole('button', { name: 'Save' });
    private Cancel = () => this.page.getByRole('button', { name: 'Cancel' })
    //private Tab = () => this.page.locator('#maintab').getByRole('link', { name: 'Merchant Details' }).click();
    private ModelDialog = () => this.page.locator('.modal-dialog ', { hasText: 'Success' });//?
    private ModelDialogHeading = () => this.page.locator('.modal-content').locator('h3');//?
    private ModelDialogHMessage = () => this.page.locator('.modal-content').locator('panel-body');//?
    private ModelDialogOKButton = () => this.page.locator('.modal-content').locator('button', { hasText: 'OK' });
    //#region MerchantDetails

    //text
    private TradingName = (TabName: string) => this.page.locator('#Store_TradingName');
    private LegalName = () => this.page.locator('#Store_LegalName');
    private VATNumber = () => this.page.locator('#Store_VatNumber');
    private AlertMessage = () => this.page.locator('.alert-message');
    private AlertTitle = () => this.page.locator('.alet-title');

    //drow down
    private CurrencyCode = () => this.page.locator('#currencyCode');
    private CurrencyCodeText = () => this.page.locator('#currencyCode').locator('//span[2]');
    private CurrencyCodeInput = () => this.page.locator('#currencyCode').getByRole('searchbox', { name: 'Select box' })
    private CurrencyCodeOption = (currencyoptino: string) => this.page.getByRole('option', { name: currencyoptino/*'Aruban Guilder AWG'*/ }).locator('span').first()

    //Event charges
    private EventChargesGroup = () => this.page.getByRole('group', { name: 'Event Charges' });
    private addEventCharges = () => this.page.locator('button[name="btnAddEventCharge"]');
    private ppt = () => this.page.locator('#ECAttribute_PPT');
    private enabled = () => this.page.locator('#ECAttribute_Enabled');
    private SaveAttribute = () => this.page.getByRole('group', { name: 'Event Charges' }).getByRole('button', { name: 'Save' })
    private EventChargesTable = () => this.page.getByRole('group', { name: 'Event Charges' }).getByRole('table');
    //
    //#endregion

    async GotoMerchantList() {

        this.common = new Common(this.page);
        await this.common.MenuOperation(MenuList.MerchantsList, Operation.Select);
    }

    async FilterMerchant_Simple(Acquirer: string, Customer: string = '', HeadOffice: string = '') {

    }

    // use different method. 
    // async ModalDialog_SelectOK() {
    //     this.common = new Common(this.page);
    //     //await expect(this.ModelDialog()).toBeVisible();
    //     //const ss=await this.ModelDialogHMessage().innerText();//).toBe('Request completed.');
    //     //console.log(ss);
    //     //expect(this.ModelDialogHeading()).toBe('Success');
    //     //await this.ModelDialog().click();
    //     //await expect(this.page.getByRole('dialog')).toBeVisible());


    //     await this.ModelDialogOKButton().click();
    //     await this.common.WaitForPageLoad();

    // }

    async UpdateCountry(Country: string) {
        this.common = new Common(this.page);
        await this.common.FillDropDown('#tradingCountry', Country)
    }

    async UpdateVATWithError(VAT: string, expectedError: string = '') {
        this.common = new Common(this.page);
        await this.VATNumber().fill(VAT);
        console.log("VAT value updated as " + VAT);
        //await this.SaveChanges(true);
        await this.Save().click();

        await this.common.WaitForPageLoad();

        if (expectedError) {
            await expect(this.AlertMessage()).toBeVisible({ timeout: 10000 });
            //await expect(this.CurrencyCode()).toHaveText(Properties.get(MerchantProperties.CurrencyCode)!);
            await expect(this.AlertMessage()).toContainText(expectedError);

        } else
            await this.common.ModelDialogOperation("", "", ModelDialogButton.OK);
        // if (Properties.has(MerchantProperties.CurrencyCode)) {
        //     await this.CurrencyCode().click();
        //     await this.CurrencyCodeInput().fill(Properties.get(MerchantProperties.CurrencyCode)!);
        //     await this.CurrencyCodeOption(Properties.get(MerchantProperties.CurrencyCode)!).click();
        //     await expect(this.CurrencyCode()).toContainText(Properties.get(MerchantProperties.CurrencyCode)!);
        // }


    }

    //I need 
    // property name| type|
    //"Legal name" | textbox | 
    async Modify(Properties: Map<string, string>) {
        if (Properties.has(MerchantProperties.LegalName)) {
            await this.LegalName().fill(Properties.get(MerchantProperties.LegalName)!);
        }

        if (Properties.has(MerchantProperties.CurrencyCode)) {
            await this.CurrencyCode().click();
            await this.CurrencyCodeInput().fill(Properties.get(MerchantProperties.CurrencyCode)!);
            await this.CurrencyCodeOption(Properties.get(MerchantProperties.CurrencyCode)!).click();
            await expect(this.CurrencyCode()).toContainText(Properties.get(MerchantProperties.CurrencyCode)!);
        }

        console.log(Properties.get(MerchantProperties.LegalName)!);
    }


    async VerifyPropertyValue(Properties: Map<string, string>) {
        if (Properties.has(MerchantProperties.LegalName)) {
            await expect(this.LegalName()).toBeDisabled();
            await expect(this.LegalName()).toHaveValue(Properties.get(MerchantProperties.LegalName)!);

        }

        if (Properties.has(MerchantProperties.CurrencyCode)) {
            await expect(this.LegalName()).toBeDisabled();
            await expect(this.CurrencyCodeText()).toContainText(Properties.get(MerchantProperties.CurrencyCode)!);
        }
    }


    async MerchantInEditState(): Promise<boolean> {
        return await this.Save().isVisible();
    }

    async Actions(submenu: string) {
        if (await this.PendingOperation().isVisible())
            throw new Error('In pending operation');
        // if (await this.Save().isVisible())
        //     return ; //already in edit state
        await this.ActionMenu().click();
        await this.ActionMenuOptions(submenu).click();
        //await this.page.waitForTimeout(5000);
        //await this.Cancel().click();
        //await this.page.waitForTimeout(5000);

    }



    async CancelEdit() {
        await this.Cancel().click();
    }

    async IsMerchantInEditState() {
        return await this.Cancel().isVisible();
    }

    async SaveChanges(WithoutApproval: boolean) {
        await this.Save().click();
        this.common = new Common(this.page);
        await this.common.WaitForPageLoad();
        //await this.ModalDialog_SelectOK();//TODO

        //verify this
        //this dialog will not come if there is error- need to remove
        await this.common.ModelDialogOperation("", "", ModelDialogButton.OK);

    }

    async ApprovePendingOperation(MerchantName: string, Action: string) {
        await this.PendingOperation().click();

        await this.page.waitForTimeout(3000);

        this.admin = new Administration(this.page);
        await this.admin.PerformAction(MerchantName, Action);

        //await this.ModalDialog_SelectOK();
        //info operation successfully approved
    }

    async AddEventCharges(tabName: string) {
        await this.Tab(tabName).click();

        //Edit if not already

        //remove existing event charges if any
        await expect(this.EventChargesGroup()).toBeVisible();
        await this.addEventCharges().click();

        await expect(this.page.locator('#frm-variable-acquirer-dialog-panel')).toBeVisible({ timeout: 10000 });
        this.common = new Common(this.page);

        await this.common.FillDropDown1('#ECAttribute_ECAttributeTypeId', 'Fraud Check');
        
        await this.SaveAttribute().click();


        
        //await expect(this.page.locator('#frm-variable-acquirer-dialog-panel')).({ timeout: 10000 });
        //ECAttribute_ECAttributeTypeId


        // this.common = new Common(this.page);
        // await this.common.WaitForPageLoad();
        //await this.ModalDialog_SelectOK();//TODO

        //verify this
        //this dialog will not come if there is error- need to remove
        // await this.common.ModelDialogOperation("", "", ModelDialogButton.OK);

    }
}