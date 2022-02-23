import axios from 'axios';
import { pactMockFactory } from './mocks/pact.mock';
import mockFs from 'mock-fs';
import { publish } from '../src/commands/publish';
import { serviceContractsFormMockFactory } from './mocks/serviceContractsForm.mock';
import { swaggerFileMock } from './mocks/swagger.mock';

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

        await publish({
            url,
            serviceVersion,
            serviceName,
            pactsDir: './pacts',
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            `http://judge-d.instance.com/contracts/services/${serviceName}/versions/${serviceVersion}`,
            serviceContractsFormMock
        );
    });

    test('reads swagger file, generate contracts form and makes post call to judge-d API', async () => {
        const swaggerFileStringJSON = JSON.stringify(swaggerFileMock);
        mockFs({
            './swagger': {
                'swagger.json': swaggerFileStringJSON,
            },
        });

        const serviceContractsFormMock = serviceContractsFormMockFactory.build({
            capabilities: {
                rest: {
                    value: swaggerFileStringJSON,
                    mimeType: 'application/json',
                },
            },
            expectations: {},
        });

        const serviceName = 'example-service';
        const serviceVersion = '1.1.0';
        const url = 'http://judge-d.instance.com';

        await publish({
            url,
            serviceVersion,
            serviceName,
            swaggerFile: './swagger/swagger.json',
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            `http://judge-d.instance.com/contracts/services/${serviceName}/versions/${serviceVersion}`,
            serviceContractsFormMock
        );
    });

    test('reads pact file and swagger file, generates contracts form and makes post call to judge-d API', async () => {
        const pactMockForProviderService = pactMockFactory.build();
        const swaggerFileStringJSON = JSON.stringify(swaggerFileMock);

        mockFs({
            './pacts': {
                'service-1-pact.json': JSON.stringify(
                    pactMockForProviderService
                ),
            },
            './swagger': {
                'swagger.json': swaggerFileStringJSON,
            },
        });

        await publish({
            serviceVersion: '1.1.0',
            serviceName: 'example-service',
            url: 'http://judge-d.instance.com',
            pactsDir: './pacts',
            swaggerFile: './swagger/swagger.json',
        });

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            `http://judge-d.instance.com/contracts/services/example-service/versions/1.1.0`,
            serviceContractsFormMockFactory.build({
                expectations: {
                    [pactMockForProviderService.provider.name]: {
                        rest: {
                            value: JSON.stringify(pactMockForProviderService),
                            mimeType: 'application/json',
                        },
                    },
                },
                capabilities: {
                    rest: {
                        value: swaggerFileStringJSON,
                        mimeType: 'application/json',
                    },
                },
            })
        );
    });
});
