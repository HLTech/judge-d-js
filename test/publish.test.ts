import axios from 'axios';
import { pactMockFactory } from './mocks/pact.mock';
import mockFs from 'mock-fs';
import { publish } from '../src/commands/publish';
import { buildUrl } from '../src/utils/build-url';
import { serviceContractsFormMockFactory } from './mocks/serviceContractsForm.mock';

jest.mock('axios');

describe('publish', () => {
    test('read pact files, generate contracts form and makes post call to judge-d API', async () => {
        const pactMockForProviderService1 = pactMockFactory.build();
        const pactMockForProviderService2 = pactMockFactory.build({
            provider: { name: 'provider-service-2' },
        });

        mockFs({
            './pacts': {
                'service-1-pact.json': JSON.stringify(
                    pactMockForProviderService1
                ),
                'service-2-pact.json': JSON.stringify(
                    pactMockForProviderService2
                ),
            },
        });

        const serviceContractsFormMock = serviceContractsFormMockFactory.build({
            expectations: {
                [pactMockForProviderService1.provider.name]: {
                    rest: {
                        value: JSON.stringify(pactMockForProviderService1),
                        mimeType: 'application/json',
                    },
                },
                [pactMockForProviderService2.provider.name]: {
                    rest: {
                        value: JSON.stringify(pactMockForProviderService2),
                        mimeType: 'application/json',
                    },
                },
            },
        });

        const serviceName = 'example-service';
        const serviceVersion = '1.1.0';
        const url = 'http://judge-d.instance.com';
        const pactsPostUrl = buildUrl(url, serviceName, serviceVersion);

        await publish({
            url,
            serviceVersion,
            serviceName,
            pactsDir: './pacts',
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            pactsPostUrl,
            serviceContractsFormMock
        );
    });
});
