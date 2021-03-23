import ejs from 'ejs';
import fs from 'fs';

type Status = 'OK' | 'FAILED';

export interface ValidationResult {
    validationStatus?: Status;
    consumerAndProvider: {
        providerName: string;
        providerVersion: string;
        consumerName: string;
        consumerVersion: string;
    };
    interactions: Array<{
        validationResult: Status;
        interactionName: string;
        errors: string[];
    }>;
}

export async function generateReport(
    outFile: string,
    validationResults?: ValidationResult[]
) {
    let htmlReport = await ejs.renderFile('./template/report-template.ejs', {
        validationResults,
    });
    fs.writeFileSync(`${outFile}.html`, htmlReport);
}
