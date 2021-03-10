import { readPacts } from '../src/utils/read-pacts';
import { pactMockFactory } from './mocks/pact.mock';
import mockFs from 'mock-fs';

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
});
