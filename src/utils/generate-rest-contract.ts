import { RestContract } from '../types';

export function generateRestContract(value: object): RestContract {
    return {
        rest: {
            value: JSON.stringify(value),
            mimeType: 'application/json',
        },
    };
}
