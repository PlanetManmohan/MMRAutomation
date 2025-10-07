export default class TabList {


    public static readonly MerchantDetails: String = "Merchant Details";
    public static readonly TerminalDetails = "Terminal Details";
    public static readonly FeesAndCharges = "Fees & Charges";
    public static readonly Rebate = "Rebate";
    public static readonly Payment = "Payment";
    public static readonly Rates = "Rates";
    public static readonly Reports = "Reports";
    public static readonly Tasks = "Tasks";
    public static readonly Dev = "DEV";
}

export class MerchantProperties {


    public static readonly TradingName: string = "TradingName";
    public static readonly LegalName = "LegalName";


    public static readonly CurrencyCode = "currencyCode";
    public static readonly Rebate = "Rebate";
    public static readonly Payment = "Payment";
    public static readonly Rates = "Rates";
    public static readonly Reports = "Reports";
    public static readonly Tasks = "Tasks";
    public static readonly Dev = "DEV";
}

export class MerchantOperationActions {
    public static readonly Approve: string = 'Approve';
    public static readonly Reject = 'Reject';
    public static readonly ViewCurrencyDetails = 'View Currency Details';
}

export class ModelDialogButton {
    public static readonly Yes: string = 'Yes';
    public static readonly No = 'No';
    public static readonly OK = 'OK';
}

export class ModelDialogHeading {
    public static readonly Info = 'Info';
    public static readonly ConfirmAction = 'Confirm Action';
    public static readonly ValidationErrors = 'Validation Errors';
    public static readonly Success = 'Success';

}

export class ModelDialogMessage {
    public static readonly AreYouSureApprove = 'Are you sure you want to approve this operation?';
    public static readonly AreYouSureReject = 'Are you sure you want to reject this operation?';
    public static readonly OperationApproved = 'Operation successfully Approved.';

}

export class ValidationErrors {
    public static readonly StatementNameMoreThan = 'The Statement Name for PBT_264091615 is > 100 characters.';
    public static readonly InvoiceNameMoreThan = 'The Invoice Name for More_than_100_characters_invoice_report_name_to_Check_error__through_automation_testing_264091615_101 is > 100 characters.';
    public static readonly OperationApproved = 'Operation successfully Approved.';
    public static readonly InvoiceNameAlreadyInUse = "The store 'PBT_264091615' is using the name 'DuplicateInvoiceNameForAutoTest' for the Invoice that is already used by another Merchant or Head Office for a report.";
    public static readonly StatementNameAlreadyInUse = "The store 'PBT_264091615' is using the name 'DuplicateStatementNameForAutoTest' for the Statement/Rebate that is already used by another Merchant or Head Office for a report.";
    public static readonly MIDAlreadyExists = "MID [26221984] already exists in the database.";
    public static readonly TIDAlreadyExists = "TID [26221984] already exists in the database.";
    public static readonly StatementNameEmpty = "A Statement Name is required for PBT_264091615.";
    public static readonly InvoiceNameEmpty = "Invoice Name is required for PBT_264091615.";

}

export class AcquirerName {
    public static readonly PayByTech = "PayByTech";
    public static readonly PlanetPOSPMSL = "Planet POS PMSL";
    public static readonly Scandic = "Scandic";
    public static readonly Avolta = "Avolta";

}
export class ImportErrorFilePath {
    private static readonly ValidationErrorFolder = ".\\BoardingForms\\ValidationError\\";
    public static readonly StatementNameMoreThan = this.ValidationErrorFolder + 'PBT264_Auto_Error_StatementReportNameMoreThan100.xlsx';
    public static readonly InvoiceNameMoreThan = this.ValidationErrorFolder + 'PBT264_Auto_Error_InvoiceReportNameMoreThan100.xlsx';
    public static readonly InvoiceNameAlreadyInUse = this.ValidationErrorFolder + 'PBT264_Auto_Error_InvoiceReportNameAlreadyInUse.xlsx';
    public static readonly StatementNameAlreadyInUse = this.ValidationErrorFolder + 'PBT264_Auto_Error_StatementReportNameAlreadyInUse.xlsx';
    public static readonly MIDAlreadyExists = this.ValidationErrorFolder + 'PBT264_Auto_Error_MIDAlreadyExists.xlsx';
    public static readonly TIDAlreadyExists = this.ValidationErrorFolder + 'PBT264_Auto_Error_TIDAlreadyExists.xlsx';
    public static readonly StatementNameEmpty = this.ValidationErrorFolder + 'PBT264_Auto_Error_StatementReportNameEmpty.xlsx';
    public static readonly InvoiceNameEmpty = this.ValidationErrorFolder + 'PBT264_Auto_Error_InvoiceReportNameEmpty.xlsx';

}

export class ImportFilePath {
    private static readonly ValidationFolder = ".\\BoardingForms\\BaseForms\\";
    public static readonly ProcessedFolder = ".\\BoardingForms\\Processed\\";
    public static readonly PBT_MSCAtHO1TID = this.ValidationFolder + 'PBT_MSCHO_1tid.xlsx';
    public static readonly PlanetPMSL_AllCharges_3TID = this.ValidationFolder + 'PMSL_AllCharges_MSCMerchant_3TID.xlsx';
    public static readonly Scandic_EPPHO = this.ValidationFolder + 'Scandic_EPP_HOLevel.xlsx'
    public static readonly Scandic_EPPMerchant = this.ValidationFolder + 'Scandic_EPP_StoreLevel.xlsx';

}

export class PageURL {
    static readonly ImportFile = '/#/FileImport';
    static readonly MerchantList = '/#/Store';

}




//experimental class for validation error to keep all at one place
// const cktr1 = {
//     cktr_name: "Virat Kohli",
//     cktr_team: "India",
//     cktr_runs: 26000
// }
// const cktr2 = {
//     cktr_name: "AB De Villiers",
//     cktr_team: "South Africa",
//     cktr_runs: 15000
// }
// const cktr3 = {
//     cktr_name: "David Warner",
//     cktr_team: "Australia",
//     cktr_runs: 13000
// }
export class Ex_error {//experimental class for validation error to keep all at one place
    public static readonly StatementNameMoreThan = [AcquirerName.PayByTech, ImportErrorFilePath.StatementNameMoreThan, '1. PBT_264091615 (264091615)\n' + ValidationErrors.StatementNameMoreThan];
    public static readonly InvoiceNameMoreThan = [AcquirerName.PayByTech, ImportErrorFilePath.InvoiceNameMoreThan, '1. PBT_264091615 (264091615)\n' + ValidationErrors.InvoiceNameMoreThan];
    //public myArr: Array<typeof cktr1> = [cktr1, cktr2, cktr3];
    //static myArr: any;
}

