import { test, expect } from '../../Pages/HooksFixture';
import Common from '../../Pages/Common';
import MerchantList from '../../Pages/MerchantList.page';
import Merchant from '../../Pages/Merchant.page';
import Administration from '../../Pages/Administration.page';
import { MerchantOperationActions, MerchantProperties } from '../../Pages/Variables';

let merchant: MerchantList;

test.describe("Basic tests", () => {

    test('has MMR title', async ({ page, loginlogoutfixture }) => {
        merchant = new MerchantList(page);
        await merchant.goto();
        const title = await page.title();
        console.log(title);
        expect(title).toBe("MMR");
    })

    test('Filter Merchant simple', async ({ page, loginlogoutfixture }) => {

        merchant = new MerchantList(page);
        await merchant.goto();
        await merchant.FilterMerchant_Simple('Planet POS PMSL', 'Onboarding HO 1', 'Onboarding HO 1');

        await merchant.AnalyseResult();
        await page.screenshot({ path: 'Filter_merchant.png' })

        
    })

    

    test('Filter Merchant detailed', async ({ page, loginlogoutfixture }) => {

        merchant = new MerchantList(page);
        await merchant.goto();
        
        await merchant.FilterMerchant_Detail('Planet POS PMSL', 'Onboarding HO 1', 'Onboarding HO 1', 'Euro EUR', 'Cyprus', 'ATM', 'JCB');

        await merchant.AnalyseResult();
        await page.screenshot({ path: 'filter merchant detailed.png' })

    })

    test('Apply and clear filter ', async ({ page, loginlogoutfixture }) => {
        merchant = new MerchantList(page);
        await merchant.goto();
        
        await merchant.FilterMerchant_Simple('Planet POS PMSL', 'Onboarding HO 1', 'Onboarding HO 1');

        await merchant.AnalyseResult();

        await merchant.ClearFilter();
        await merchant.AnalyseResult();

        await page.screenshot({ path: 'clear Filter_merchant.png' });

    })

    test('Search record', async ({ page, loginlogoutfixture }) => {
        merchant = new MerchantList(page);
        await merchant.goto();
        await merchant.Search('200220251');
        await page.waitForTimeout(2000);
        await merchant.AnalyseResult();
    })

});
    
    //working, next to make roburst
    test.fixme('with approval: update dropdown:update currency', async ({ page, loginlogoutfixture }) => {
        let merchantList = new MerchantList(page);
        let merchant = new Merchant(page);
        let common = new Common(page);
        let admin = new Administration(page);
        let MerchantInfo = new Map<string, string>();
        //await merchantList.GotoMerchantList();
        await merchantList.goto();
        await merchantList.Search(MerchantInfo.get('no')!);//202503061
    
        await page.waitForTimeout(3000);
        await merchantList.AnalyseResult();
        await merchantList.SelectMerchant(MerchantInfo.get('na')!);//ST 35225 AUTOMATION 3
    
        await expect(page.locator('button', { hasText: 'Actions' })).toBeVisible({ timeout: 15000 });
    
        await common.WaitForPageLoad();
    
    
        //await page.waitForTimeout(3000);
        await merchant.Actions('Edit Details');
    
        let modify = new Map<string, string>();
        modify.set(MerchantProperties.CurrencyCode, 'AWG');//AWG DZD
        //await page.locator('store-application-histirical-detail-panel div').filter({hasText:'Please wait...'}).waitFor({state:'detached'});
    
        //await page.waitForTimeout(3000);
    
        await merchant.Modify(modify);
    
        await merchant.SaveChanges(true);
        await merchant.ApprovePendingOperation(MerchantInfo.get('na')!, MerchantOperationActions.Approve);
        await page.goBack();
    
        // await common.WaitForPageLoad();
    
        // let modify = new Map<string, string>();
        // modify.set(MerchantProperties.CurrencyCode, 'HRK');//AWG DZD
        await merchant.VerifyPropertyValue(modify);
    
    });
    
    test.skip('Without approval: Merchant trading and legal name', async ({ page, loginlogoutfixture }) => {
        let merchantList: MerchantList;
        let merchant: Merchant;
        let common: Common;
        
        merchantList = new MerchantList(page);
        merchant = new Merchant(page);
        common = new Common(page);
        let MerchantInfo = new Map<string, string>();
        //await merchantList.GotoMerchantList();
        await merchantList.goto();
        await merchantList.Search(MerchantInfo.get('no')!);
    
        await page.waitForTimeout(3000);
        await merchantList.AnalyseResult();
        //await page.waitForTimeout(5000);
        await merchantList.SelectMerchant('ST 35225 AUTOMATION 3');
    
        await common.WaitForPageLoad();
        await merchant.Actions('Edit Details');
    
        let modify = new Map<string, string>();
        modify.set(MerchantProperties.LegalName, 'ST 35225 automation 1');
        await merchant.Modify(modify);
    
        await merchant.SaveChanges(true);
    
        await merchant.VerifyPropertyValue(modify);
        await page.screenshot({ path: 'Merchant trading and legal name.png' });
    })
    