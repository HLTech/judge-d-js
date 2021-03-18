import { run } from '../src';
import { publish } from '../src/commands/publish';
import { mocked } from 'ts-jest/utils';
import { processMockFactory } from './mocks/process.mock';

jest.mock('../src/commands/publish');

describe('run', () => {
    beforeEach(() =>
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn())
    );
    test('it invokes publish function with correct arguments', () => {
        const processMock = processMockFactory.build();

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

    test('catches axios post error, forwards message to console.error and call process exit', async () => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        mocked(publish).mockImplementation(() => {
            throw {
                isAxiosError: true,
                message: 'error message',
                toJSON: jest.fn(),
            };
        });
        const processMock = processMockFactory.build();

        await run(processMock);

        expect(console.error).toHaveBeenCalled();
        expect(processMock.exit).toHaveBeenCalledWith(1);
    });

    test('catches error other than axios, forwards message to console.error and call process exit', async () => {
        mocked(publish).mockImplementation(() => {
            throw { message: 'error message' };
        });
        const processMock = processMockFactory.build();

        await run(processMock);

        expect(console.error).toHaveBeenCalled();
        expect(processMock.exit).toHaveBeenCalledWith(1);
    });
});
