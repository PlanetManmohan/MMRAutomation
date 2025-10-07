import BoardingFormHelper, { RegressionBF } from '../../Pages/BoradingFormHelper';
import Common from '../../Pages/Common';
import FileImport from '../../Pages/FileImport.page';
import { test, expect } from '../../Pages/HooksFixture';
import { AcquirerName, ImportErrorFilePath, ImportFilePath, ModelDialogButton, ModelDialogHeading, ValidationErrors } from '../../Pages/Variables';

let common: Common;
let importFile: FileImport;
let importHelper: BoardingFormHelper;
test.describe.configure({ /*mode: 'serial'*/ /*, retries:1* as all retires together */ });

test('Import file - PBT aquirer with MSC at HO level', async ({ page, loginlogoutfixture }) => {
    common = new Common(page);
    importFile = new FileImport(page);
    importHelper = new BoardingFormHelper();

    await importFile.goto();
    const importFilePath = await importHelper.GetRegressionBF(RegressionBF.PBT_MSCAtHO1TID);
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', importFilePath)

    await common.ModelDialogOperation_Error(ModelDialogHeading.Success, ValidationErrors.StatementNameMoreThan, ModelDialogButton.OK)

});

test('Import file - Planet PMSL with all charges, MSC at Merchant level and 3 tid', async ({ page, loginlogoutfixture }) => {
    common = new Common(page);
    importFile = new FileImport(page);
    importHelper = new BoardingFormHelper();

    await importFile.goto();
    const importFilePath = await importHelper.GetRegressionBF(RegressionBF.PlanetPMSL_AllCharges_3TID);
    await importFile.ImportBF(AcquirerName.PlanetPOSPMSL, '', '', importFilePath)

    await common.ModelDialogOperation_Error(ModelDialogHeading.Success, ValidationErrors.StatementNameMoreThan, ModelDialogButton.OK)

    await page.pause();
});

test.fixme('Import file - Scandic EPP at HO level', async ({ page, loginlogoutfixture }) => {

});

test('Import file - Scandic EPP at merchant level', async ({ page, loginlogoutfixture }) => {
    common = new Common(page);
    importFile = new FileImport(page);
    importHelper = new BoardingFormHelper();

    await importFile.goto();
    await importFile.WaitForImport('PBT_MSCHO_1tid.xlsx', AcquirerName.PayByTech);

});



