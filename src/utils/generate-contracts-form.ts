import { Pact } from './read-pacts';

export function generateContractsForm(pactFiles: Pact[]): ServiceContractsForm {
    return pactFiles.reduce<ServiceContractsForm>(
        (serviceContractsForm, fileContent) => {
            if (fileContent.provider?.name) {
                return {
                    ...serviceContractsForm,
                    expectations: {
                        ...serviceContractsForm.expectations,
                        [fileContent.provider.name]: {
                            rest: {
                                value: JSON.stringify(fileContent),
                                mimeType: 'application-json',
                            },
                        },
                    },
                };
            }
            return serviceContractsForm;
        },
        {
            capabilities: {},
            expectations: {},
        }
    );
}

export interface ServiceContractsForm {
    capabilities: Record<string, RestContract>;
    expectations: Record<string, RestContract>;
}

interface RestContract {
    rest: {
        value: string;
        mimeType: 'application-json';
    };
}
