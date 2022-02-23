import mockFs from 'mock-fs';
import { swaggerFileMock } from './mocks/swagger.mock';
import { readSwagger } from '../src/utils/read-swagger';

describe('readSwagger', () => {
    test('returns correctly read swagger file', () => {
        mockFs({
            './swagger': {
                'swagger.json': JSON.stringify(swaggerFileMock),
            },
        });

        const swaggerFile = readSwagger('./swagger/swagger.json');

        expect(swaggerFile).toEqual(swaggerFileMock);
    });

    test('throws error when swagger file does not exist', () => {
        mockFs({ './swagger': {} });

        expect(() => readSwagger('./swagger/swagger.json')).toThrow(
            "ENOENT: no such file or directory, open './swagger/swagger.json'"
        );
    });

    test('throws error when swagger file extension is not .json', () => {
        mockFs({
            './swagger': {
                'swagger.html': JSON.stringify(swaggerFileMock),
            },
        });

        expect(() => readSwagger('./swagger')).toThrow(
            'Only json swagger files are supported.'
        );
    });
});
