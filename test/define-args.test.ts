import { defineArgs } from '../src/utils/define-args';

describe('defineArgs', () => {
    test('returns correctly parsed process arguments', () => {
        const argv = defineArgs([
            'publish',
            '--url',
            'judge-d.instance.com',
            '--pactsDir',
            '/pacts',
            '--serviceName',
            'example-service',
            '--serviceVersion',
            '1.0.0',
        ]);

        expect(argv).toMatchObject({
            _: ['publish'],
            url: 'judge-d.instance.com',
            pactsDir: '/pacts',
            serviceName: 'example-service',
            serviceVersion: '1.0.0',
        });
    });
});
