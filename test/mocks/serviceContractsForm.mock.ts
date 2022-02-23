import { makeFactory } from 'factory.ts';
import { ServiceContractsForm } from '../../src/types';

export const serviceContractsFormMockFactory = makeFactory<ServiceContractsForm>(
    {
        capabilities: {},
        expectations: {},
    }
);
