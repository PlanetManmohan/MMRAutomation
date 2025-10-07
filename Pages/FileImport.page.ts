import { expect, Page } from "@playwright/test";
import Common, { Operation } from './Common';
import { PageURL } from "./Variables";


export default class FileImport {


    private page: Page;
    private common: Common;

    constructor(page: Page) {
        this.page = page;
    }

    //#Locators

    private GenerateNewCustomer = () => this.page.locator('#Import_GenerateNewCustomer');
    private GenerateNewHO = () => this.page.locator('#Import_GenerateNewHeadOffice');
    private readonly acquirerId = '#acquirerId';
    private readonly customerId = '#customerId';
    private readonly headofficeId = '#merchantGroupId';
    private readonly importLogTableId = '#dgtFileImportLog';

    private FileUpload = () => this.page.locator('#fileimport-fileupload-select');
    private uploadButton = () => this.page.getByRole('button', { name: 'Upload File', exact: false })
    private importLogTable = () => this.page.locator(this.importLogTableId);
    async goto() {

        //await this.common.MenuOperation(MenuList.UtilitiesImportFile, Operation.Select);
        await this.page.goto(PageURL.ImportFile);
    }

    async ImportBF(Acquirer: string, customer: string, headoffice: string, filepath: string) {
        this.common = new Common(this.page);
        await this.common.FillDropDown(this.acquirerId, Acquirer);

        if (customer.trim() === '') {
            await this.GenerateNewCustomer().click();
        } else
            await this.common.FillDropDown(this.customerId, customer);

        if (customer.trim() === '') {
            await this.GenerateNewHO().click();
        } else
            await this.common.FillDropDown(this.headofficeId, headoffice);


        await this.FileUpload().setInputFiles(filepath);

        await expect(this.uploadButton()).toBeEnabled();
        await this.uploadButton().click();
    }

    async WaitForImport(filename: string, Acquirer: string) {
        this.common = new Common(this.page);
        await this.page.goto('#/FileImport/Log');
        let i = 20;
        let found = false;
        while (i > 0) {
            let status = await this.common.GetCellValue(this.importLogTable(), 'Status', filename);
            if (status === 'PROCCESSED') {
                found = true;
                break;
            }

            await this.page.waitForTimeout(30000);
            //status = await this.common.GetCellValue(this.importLogTable(), 'Status', filename);
            await this.page.reload()
            i--;
        }
    }

}