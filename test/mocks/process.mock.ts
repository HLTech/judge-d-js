import { makeFactory } from 'factory.ts';

export const processMockFactory = makeFactory(({
    argv: [
        'node-param',
        'node-param',
        'publish',
        '--url',
        'judge-d.instance.com',
        '--pactsDir',
        '/pacts',
        '--serviceName',
        'example-service',
        '--serviceVersion',
        '1.0.0',
    ],
    exit: jest.fn(),
} as unknown) as NodeJS.Process);
