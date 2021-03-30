import axios from 'axios';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import { run } from '../src';
import { publish } from '../src/commands/publish';
import { mocked } from 'ts-jest/utils';
import { processMockFactory } from './mocks/process.mock';
import { validationResultMockFactory } from './mocks/validationResult.mock';

jest.mock('../src/commands/publish');
jest.mock('axios');
jest.mock('fs');
jest.mock('ejs');

describe('run', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
    });

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

    test('it generates report when verify is called with correct arguments', async () => {
        const validationResultsMock = [validationResultMockFactory.build()];
        mocked(axios.get).mockResolvedValueOnce({
            data: validationResultsMock,
        });

        const processMock = processMockFactory.build({
            argv: [
                'node-param',
                'node-param',
                'verify',
                '--url',
                'https://judge-d.instance.com',
                '--serviceName',
                'example-service',
                '--serviceVersion',
                '1.0.0',
                '--environment',
                'DEMO',
                '--outFile',
                './report/dredd/contract-tests-report',
            ],
        });

        await run(processMock);

        expect(axios.get).toHaveBeenCalledWith(
            `https://judge-d.instance.com/environment-compatibility-report/example-service:1.0.0?environment=DEMO`
        );

        const pathToTemplate = path.resolve(
            __dirname,
            '../template/report-template.ejs'
        );

        expect(fs.mkdirSync).toHaveBeenCalledWith('./report/dredd', {
            recursive: true,
        });
        expect(ejs.renderFile).toHaveBeenCalledWith(pathToTemplate, {
            validationResults: validationResultsMock,
        });
        expect(processMock.exit).not.toHaveBeenCalled();
    });

    test('it process exit when command verify is called and one of the interaction failed', async () => {
        mocked(axios.get).mockResolvedValueOnce({
            data: [
                validationResultMockFactory.build({
                    interactions: [
                        {
                            validationResult: 'FAILED',
                            errors: ['Example error'],
                        },
                    ],
                }),
            ],
        });

        const processMock = processMockFactory.build({
            argv: [
                'node-param',
                'node-param',
                'verify',
                '--url',
                'https://judge-d.instance.com',
                '--serviceName',
                'example-service',
                '--serviceVersion',
                '1.0.0',
                '--environment',
                'DEMO',
                '--outFile',
                './report',
            ],
        });

        await run(processMock);

        expect(processMock.exit).toHaveBeenCalledWith(1);
    });
});
