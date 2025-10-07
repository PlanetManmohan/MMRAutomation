import { expect, Locator, Page } from "@playwright/test";
import { error } from "console";
import Common, { Operation } from './Common';
import MenuList from "./MenuList";
import { PageURL } from "./Variables";

export default class MerchantList {


    private page: Page;
    private user: Locator;
    private common: Common;

    constructor(page) {
        this.page = page;
        this.user = page.getByLabel('username');

    }

    //Locators
    AcquirerInput = () => this.page.locator('store-report-view').getByText('Select Acquirer');
    CustomerId = () => this.page.locator('store-report-view #customerId').getByLabel('Select box activate');
    HeadOffice = () => this.page.locator('#merchantGroupId').getByLabel('Select box activate');
    CurrencyId = () => this.page.locator('#currencyId').getByLabel('Select box activate');
    CountryId = () => this.page.locator('#countryId').getByLabel('Select box activate');
    ChannelId = () => this.page.locator('#channelId').getByLabel('Select box activate');
    cardScheme = () => this.page.locator('#cardScheme').getByLabel('Select box activate');
    MCC = () => this.page.locator('#mcc').getByLabel('Select box activate');
    DeviceGateway = () => this.page.locator('#deviceGateway').getByText('Please Select');
    Status = () => this.page.locator('#status');
    SearchFor = () => this.page.locator('#searchfield');
    SearchTextbox = () => this.page.locator('#searchTextBox');
    Clear = () => this.page.getByRole('button', { name: 'Clear Filter' });
    PaginationInfo = () => this.page.locator('.pagination-info');
    
    LoadingMessage = () => this.page.locator('.loading-text');

    MerchantTable = () => this.page.locator('#dtgStore');
    NoRecordFoundMessage = () => this.page.locator('.no-records-found')


    Heading = () => this.page.getByRole('heading', { name: 'Merchant List' });

    Searchbox = () => this.page.getByRole('searchbox', { name: 'Select box' });
    DropDownOption = (option: string, matchExact: boolean = false) => this.page.getByRole('option', { name: option, exact: matchExact }).locator('span').first();


    async GotoMerchantList() {
        this.common = new Common(this.page);
        await this.common.MenuOperation(MenuList.MerchantsList, Operation.Select);
    }

    async goto() {
        await this.page.goto(PageURL.MerchantList);
    }


    async FilterMerchant_Simple(Acquirer: string, Customer: string = '', HeadOffice: string = '') {

        await expect(this.Heading()).toBeVisible();
        await this.AcquirerInput().click();
        await this.Searchbox().fill(Acquirer);
        await this.DropDownOption(Acquirer).click();

        if (Customer) {
            await this.CustomerId().click();
            await this.Searchbox().fill(Customer);
            await this.DropDownOption(Customer).click();
        }

        if (HeadOffice) {
            await this.HeadOffice().click();
            await this.Searchbox().fill(HeadOffice);
            await this.DropDownOption(HeadOffice).click();
        }
    }

    async FilterMerchant_Detail(Acquirer: string, Customer: string = "", HeadOffice: string = "", Currency: string = "", Country: string = '', Channel: string = '', cardScheme: string = '') {

        if (Acquirer) {
            await expect(this.Heading()).toBeVisible();
            await this.AcquirerInput().click();
            await this.Searchbox().fill(Acquirer);
            await this.DropDownOption(Acquirer).click();
        }
        if (Customer) {
            await this.CustomerId().click();
            await this.Searchbox().fill(Customer);
            await this.DropDownOption(Customer).click();
        }
        if (HeadOffice) {
            await this.HeadOffice().click();
            await this.Searchbox().fill(HeadOffice);
            await this.DropDownOption(HeadOffice).click();
        }
        if (Currency) {
            await this.CurrencyId().click();
            await this.Searchbox().fill(Currency);
            await this.DropDownOption(Currency).click();
        }
        if (Country) {
            await this.CountryId().click();
            await this.Searchbox().fill(Country);
            await this.DropDownOption(Country,false).click();
        }
        if (Channel) {
            await this.ChannelId().click();
            await this.Searchbox().fill(Channel);
            await this.DropDownOption(Channel).click();
        }
        if (cardScheme) {
            await this.cardScheme().click();
            await this.Searchbox().fill(cardScheme);
            await this.DropDownOption(cardScheme).click();

        }
        await this.page.waitForLoadState('networkidle');
    }

    async FilterMerchant_Status(status: string) {

        await this.Status().click();

        if (status) {
            //const valueToSelect=status?'Active':'Inactive';
            await this.Searchbox().fill(status);
            await this.DropDownOption(status).click();
        }
    }

    async FilterMerchant_Search(SearchFor: string, SearchValue:string) {

        

        if (SearchFor) {
            await this.SearchFor().click();
            await this.Searchbox().fill(SearchFor);
            await this.DropDownOption(SearchFor).click();
        }

        if (SearchValue) {
            await this.SearchTextbox().fill(SearchValue)
        }


    }

    async Search(SearchString: string) {
        await this.SearchTextbox().fill(SearchString);
    }

    async ClearFilter() {
        await this.Clear().click();
    }

    async VerifyResult_SingleColumn(column: string, value: string) {
        this.common = new Common(this.page);
        //let table = this.page.locator('#dtgStore');
        let colNo = await this.common.getColumnNumber(this.page.locator('#dtgStore'), column)

        for (const row of await this.MerchantTable().locator("//tbody//tr").all()) {
            await expect(row.locator('//td').nth(colNo), `All rows should have ${column} value as ${value}`).toContainText(value);
        };
    }

    async AnalyseResult() {
        let noRecordFound = false;
        let recordFound = false;
        let loading = false;
        do {
            noRecordFound = false;
            recordFound = false;
            await this.page.waitForTimeout(2000);//TODO: Adjust wait

            noRecordFound = await this.NoRecordFoundMessage().isVisible();
            if (!noRecordFound) {
                recordFound = await this.PaginationInfo().isVisible();
                if (recordFound) {
                    await this.GetNumberOfRows(true);
                    break;
                }
            }
            // else { //TODO: is this needed?
            //     loading = await this.LoadingMessage().isVisible();
            //     continue;
            // }
        } while (!noRecordFound && !recordFound);
        if (noRecordFound)
            console.log('No result found');

    }

    private async GetNumberOfRows(ReportInLog: boolean = true) {
        //let df='Showing 1 to 7 of 7 rows';
        let NumberOfRows = await this.PaginationInfo().textContent();
        let RowsCount = "";
        //Extracting record numbers from pagination string
        if (NumberOfRows != null)
            RowsCount = NumberOfRows.substring(NumberOfRows.indexOf(' of ') + 4, NumberOfRows.indexOf(' rows'));

        if (ReportInLog) {
            console.log('Number of result found: ' + RowsCount);
        }
        return RowsCount;
    }

    async VerifyTableInfo() {
        throw new error('incomplete, use : https://www.youtube.com/watch?v=n7lN899n-io')
        const Columns = await this.MerchantTable().locator('th').allTextContents();
        let i = 0;
        for (i = 0; i < Columns.length; i++) {
            if (Columns[i].trim() == 'MID') {
                console.log('Found MID columen at position ' + i)
                break;
            }

        }

        ////table[@id='dtgStore']//*[@title='View Store Detail']
        const rows1 = await this.MerchantTable().locator('tr', { hasText: 'ST 35225 AUTOMATION' }).locator('td').nth(i).allTextContents();
        // const rows = await this.MerchantTable().locator('tr').locator('td').nth(i).allTextContents();
        // let j = 0;
        // for (j = 0; j < rows.length; j++) {
        //     console.log(rows[j]);
        //     if (rows[j] == 'ST 35225 AUTOMATION') {
        //         break;
        //     }

        // }

        //console.log(j);
        //console.log(Columns);

        const s = await this.MerchantTable().getByTitle('View Store Detail').nth(2).allTextContents();
        console.log(s);

        const s1 = await this.MerchantTable().getByTitle('View Store Detail').locator('link', { hasText: 'ST 35225 AUTOMATION' }).nth(2).allTextContents;
        console.log(s1);
    }

    async SelectMerchant(MerchantName: string = '') {
        let found = false;
        for (let i = 0; i < 14; i++) {
            let s = await this.MerchantTable().getByTitle('View Store Detail').nth(i).innerText();
            s = s.toUpperCase();
            MerchantName = MerchantName.toUpperCase();
            if ((s).trim() == MerchantName.trim()) {
                console.log('Found merchant in row ' + i + 1)
                await this.MerchantTable().getByTitle('View Store Detail').nth(i).click();
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
}