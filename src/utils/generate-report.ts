import ejs from 'ejs';
import path from 'path';

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

export async function generateReport(validationResults?: ValidationResult[]) {
    const pathToTemplate = path.resolve(
        __dirname,
        '../../template/report-template.ejs'
    );
    return ejs.renderFile(pathToTemplate, {
        validationResults,
    });
}
