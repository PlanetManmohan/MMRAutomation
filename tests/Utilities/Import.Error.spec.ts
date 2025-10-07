//import test, { expect, Page } from '@playwright/test';
import Common from '../../Pages/Common';
import FileImport from '../../Pages/FileImport.page';
import { test, expect } from '../../Pages/HooksFixture';
import { AcquirerName, ImportErrorFilePath, ImportFilePath, ModelDialogButton, ModelDialogHeading, ValidationErrors } from '../../Pages/Variables';

let common: Common;
let importFile: FileImport;
test.describe.configure({ /*mode: 'serial'*/ /*, retries:1* as all retires together */ });


test('Import file error - Statement report name more than 100 characters', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.StatementNameMoreThan)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, '1. PBT_264091615 (264091615)\n' + ValidationErrors.StatementNameMoreThan, ModelDialogButton.OK)

});

test('Import file error - Invoice report name more than 100 characters', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.InvoiceNameMoreThan)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, '1. PBT_264091615 (264091615)\n' + ValidationErrors.InvoiceNameMoreThan, ModelDialogButton.OK)

});

test('Import file error - Invoice report name already used', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.InvoiceNameAlreadyInUse)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, '1. PBT_264091615 (264091615)\n' + ValidationErrors.InvoiceNameAlreadyInUse, ModelDialogButton.OK)

});

test('Import file error - Statement report name already used', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.StatementNameAlreadyInUse)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, '1. PBT_264091615 (264091615)\n' + ValidationErrors.StatementNameAlreadyInUse, ModelDialogButton.OK)

});

test('Import file error - MID already exists', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.MIDAlreadyExists)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, ValidationErrors.MIDAlreadyExists, ModelDialogButton.OK)

});

test('Import file error - TID already exists', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.TIDAlreadyExists)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, ValidationErrors.TIDAlreadyExists, ModelDialogButton.OK)

});

test('Import file error - Statement report name empty', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.StatementNameEmpty)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, ValidationErrors.StatementNameEmpty, ModelDialogButton.OK)

});

test('Import file error - Invoice report name empty', async ({ page, loginlogoutfixture }) => {

    importFile = new FileImport(page);
    common = new Common(page);
    importFile.goto();
    await importFile.ImportBF(AcquirerName.PayByTech, '', '', ImportErrorFilePath.InvoiceNameEmpty)

    await common.ModelDialogOperation_Error(ModelDialogHeading.ValidationErrors, ValidationErrors.InvoiceNameEmpty, ModelDialogButton.OK)

});