import { Pact, ServiceContractsForm } from '../types';
import { generateRestContract } from './generate-rest-contract';

export function generateExpectations(
    pactFiles: Pact[]
): ServiceContractsForm['expectations'] {
    const expectations: ServiceContractsForm['expectations'] = {};

    for (const pactFile of pactFiles) {
        if (pactFile.provider?.name) {
            expectations[pactFile.provider.name] = generateRestContract(
                pactFile
            );
        }
    }

    return expectations;
}
