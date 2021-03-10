import { makeFactory } from 'factory.ts';
import { ServiceContractsForm } from '../../src/utils/generate-contracts-form';
import { pactMockFactory } from './pact.mock';

export const serviceContractsFormMockFactory = makeFactory<ServiceContractsForm>(
    {
        capabilities: {},
        expectations: {
            'provider-service-1': {
                rest: {
                    value: JSON.stringify(pactMockFactory.build()),
                    mimeType: 'application-json',
                },
            },
        },
    }
);
