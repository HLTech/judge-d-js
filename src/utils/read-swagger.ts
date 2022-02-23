import * as fs from 'fs';
import { SwaggerDefinition } from '../types';

export function readSwagger(swaggerFilePath: string): SwaggerDefinition {
    if (!swaggerFilePath.endsWith('.json')) {
        throw new Error(`Only json swagger files are supported.`);
    }

    return JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
}
