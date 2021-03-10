import { run } from '../src';
import { publish } from '../src/commands/publish';

jest.mock('../src/commands/publish');

describe('run', () => {
    test('it invokes publish function with correct arguments', () => {
        const processMock = {
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
        } as NodeJS.Process;

        run(processMock);

        expect(publish).toHaveBeenCalledWith(
            expect.objectContaining({
                _: ['publish'],
                pactsDir: '/pacts',
                url: 'judge-d.instance.com',
                serviceName: 'example-service',
                serviceVersion: '1.0.0',
            })
        );
    });
});
