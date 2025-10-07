import Common from "./Common";
import { FullPackage } from "./ExcelUtils";
import { ImportFilePath } from "./Variables";

export enum RegressionBF {
    PlanetPMSL_AllCharges_3TID,
    PBT_MSCAtHO1TID,
    Scandic_EPPHO,
    Scandic_EPPMerchant,
}

// class BFHelper {
//     replaceMID = '264091613';
//     replaceTID = '26491401';
//     valueMap: Record<string, string> = {
//         'TID 1': '26491401',
//         'MSC active from date': `01/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`,
//     };
// }

export default class BoardingFormHelper {
    async GetBoardingFilePath(BF: RegressionBF): Promise<string> {
        switch (BF) {
            case RegressionBF.PlanetPMSL_AllCharges_3TID:
                return ImportFilePath.PlanetPMSL_AllCharges_3TID;
            case RegressionBF.PBT_MSCAtHO1TID:
                return ImportFilePath.PBT_MSCAtHO1TID;
            case RegressionBF.Scandic_EPPHO:
                return ImportFilePath.Scandic_EPPHO;
            case RegressionBF.Scandic_EPPMerchant:
                return ImportFilePath.Scandic_EPPMerchant;
        }
    }

    async GetRegressionBF(BF: RegressionBF): Promise<string> {


        let valueMap: Record<string, string> = {};

        let inputValue = '26409235';
        let inputFile = await this.GetBoardingFilePath(BF);
        let replaceValue = '264' + Math.floor(1000 + Math.random() * 90000);

        let outputFile = ImportFilePath.ProcessedFolder + 'Auto_' + RegressionBF[BF] + '_' + await Common.GetTimestamp() + '.xlsx';
        const datestring = `01/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`;
        valueMap['MSC active from date'] = datestring;


        switch (BF) {

            case RegressionBF.PlanetPMSL_AllCharges_3TID:
                valueMap['TID 2'] = '264' + Math.floor(1000 + Math.random() * 90000);
                valueMap['TID 3'] = '264' + Math.floor(1000 + Math.random() * 90000);

            case RegressionBF.PBT_MSCAtHO1TID:

            case RegressionBF.Scandic_EPPHO:

            case RegressionBF.Scandic_EPPMerchant:

        }

        await FullPackage(inputFile, outputFile, inputValue, replaceValue, valueMap);
        console.log('Generated file path: ' + outputFile);
        return outputFile;
    }

}