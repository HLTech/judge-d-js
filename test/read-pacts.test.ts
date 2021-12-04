import { readPacts } from '../src/utils/read-pacts';
import { pactMockFactory } from './mocks/pact.mock';
import mockFs from 'mock-fs';
import path from 'path';

describe('readPacts', () => {
    test('returns correctly read pact files', () => {
        const service1PactMock = pactMockFactory.build();
        const service2PactMock = pactMockFactory.build({
            provider: { name: 'provider-service-2' },
        });

        mockFs({
            './pacts': {
                'service-1-pact.json': JSON.stringify(service1PactMock),
                'service-2-pact.json': JSON.stringify(service2PactMock),
            },
        });

        const pacts = readPacts('./pacts');

        expect(pacts).toEqual([service1PactMock, service2PactMock]);
    });

    test('throws error when pact directory is empty', () => {
        mockFs({ './pacts': {} });

        expect(() => readPacts('./pacts')).toThrow(
            'Pact directory ./pacts is empty.'
        );
    });

    test('throws error when pact interactions array is empty', () => {
        mockFs({
            './pacts': {
                'service-pact.json': JSON.stringify(
                    pactMockFactory.build({
                        provider: {
                            name: 'provider-service',
                        },
                        interactions: [],
                    })
                ),
                'another-service-pact.json': JSON.stringify(
                    pactMockFactory.build({
                        provider: {
                            name: 'another-provider-service',
                        },
                        interactions: [],
                    })
                ),
            },
        });

        const anotherProviderServicePath = path.join(
            './pacts',
            'another-service-pact.json'
        );
        const providerServicePath = path.join('./pacts', 'service-pact.json');

        expect(() => readPacts('./pacts')).toThrow(
            `Pact interactions for provider: another-provider-service in pact file ${anotherProviderServicePath} are empty.\nPact interactions for provider: provider-service in pact file ${providerServicePath} are empty.`
        );
    });
});
