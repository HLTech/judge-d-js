import { makeFactory } from 'factory.ts';

export const pactMockFactory = makeFactory({
    provider: {
        name: 'provider-service-1',
    },
    consumer: {
        name: 'consumer-service-1',
    },
    interactions: [
        {
            description: 'publish request 200 response',
            request: {
                method: 'PUT',
                path: 'environments/testing-environment',
                headers: {},
                query: '',
                body: [
                    {
                        id: '1',
                        name: 'John Doe',
                    },
                ],
            },
            response: {
                status: '200',
                headers: {},
            },
        },
    ],
    metadata: {
        pactSpecificationVersion: '1.0.0',
    },
});
