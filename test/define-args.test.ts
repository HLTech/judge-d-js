import { defineArgs } from '../src/utils/define-args';

describe('defineArgs', () => {
    const commonRequiredArgs = [
        'publish',
        '--url',
        'judge-d.instance.com',
        '--serviceName',
        'example-service',
        '--serviceVersion',
        '1.0.0',
    ];

    test('returns correctly parsed process arguments', () => {
        const argv = defineArgs([
            ...commonRequiredArgs,
            '--pactsDir',
            '/pacts',
            '--swaggerFile',
            '/swagger/swagger.json',
        ]);

        expect(argv).toMatchObject({
            _: ['publish'],
            url: 'judge-d.instance.com',
            pactsDir: '/pacts',
            swaggerFile: '/swagger/swagger.json',
            serviceName: 'example-service',
            serviceVersion: '1.0.0',
        });
    });

    test('throws error and exit when both swaggerFile and pactsDir arguments are not passed', () => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        jest.spyOn(process, 'exit').mockImplementation();

        defineArgs(commonRequiredArgs);

        expect(console.error).toHaveBeenNthCalledWith(
            3,
            'Either pactsDir or swaggerFile argument must be passed.'
        );
        expect(process.exit).toHaveBeenCalledWith(1);
    });
});
