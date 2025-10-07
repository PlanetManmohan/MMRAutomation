import { expect, Page } from "@playwright/test";
import { PageURL } from "./Variables";

export default class DashboardPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private ModelDialog = () => this.page.locator('.modal-dialog ').first();

    //#region Model dialog
    private maincontent = () => this.page.locator('#page-content');
    private Customers = () => this.maincontent().getByRole('link', { name: 'Customers' }).describe('Customer');
    private Offices = () => this.maincontent().getByRole('link', { name: 'Offices' }).describe('Offices');
    private Merchants = () => this.maincontent().getByRole('link', { name: 'Merchants' }).describe('Merchants');
    private Terminals = () => this.maincontent().getByRole('link', { name: 'Terminals' }).describe('Terminals');
    private OperationApprovalTitle = () => this.page.locator('.plan-title').describe('Operation approval title');
    private NumberOfOperations = () => this.page.getByText('operations require approval');
    private DetailsButton = () => this.page.getByRole('link', { name: 'Details' })

    //#endregion

    async goto() {

        //await this.common.MenuOperation(MenuList.UtilitiesImportFile, Operation.Select);
        await this.page.goto('/');
    }
    
    async VerifyDashboardContent() {
        await expect(this.Customers()).toBeVisible();
        console.log(await this.Customers().textContent());

        await expect(this.Offices()).toBeVisible();
        console.log(await this.Offices().textContent());

        await expect(this.Merchants()).toBeVisible();
        console.log(await this.Merchants().textContent());

        await expect(this.Terminals()).toBeVisible();
        console.log(await this.Terminals().textContent());

        await expect(this.OperationApprovalTitle()).toBeVisible();
        console.log(await this.NumberOfOperations().textContent());

        await expect(this.DetailsButton()).toBeVisible();

    }

}