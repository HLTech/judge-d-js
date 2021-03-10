import { pactMockFactory } from './mocks/pact.mock';
import { generateContractsForm } from '../src/utils/generate-contracts-form';

describe('generateContractsForm', () => {
    test('returns correct ServiceContractsForm', () => {
        const pactMockForProviderService1 = pactMockFactory.build();
        const pactMockForProviderService2 = pactMockFactory.build({
            provider: { name: 'provider-service-2' },
        });

        const serviceContractsForm = generateContractsForm([
            pactMockForProviderService1,
            pactMockForProviderService2,
        ]);

        expect(serviceContractsForm).toEqual({
            capabilities: {},
            expectations: {
                [pactMockForProviderService1.provider.name]: {
                    rest: {
                        value: JSON.stringify(pactMockForProviderService1),
                        mimeType: 'application-json',
                    },
                },
                [pactMockForProviderService2.provider.name]: {
                    rest: {
                        value: JSON.stringify(pactMockForProviderService2),
                        mimeType: 'application-json',
                    },
                },
            },
        });
    });
});
