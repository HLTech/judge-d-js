import { makeFactory } from 'factory.ts';
import { ValidationResult } from '../../src/utils/generate-report';

export const validationResultMockFactory = makeFactory<ValidationResult>({
    consumerAndProvider: {
        providerName: 'provider-name',
        providerVersion: 'provider-version',
        consumerName: 'consumer-name',
        consumerVersion: 'consumer-version',
    },
    interactions: [
        {
            validationResult: 'OK',
            interactionName: 'interaction name',
            errors: [],
        },
    ],
});
