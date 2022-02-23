export interface ServiceContractsForm {
    capabilities: Partial<RestContract>;
    expectations: Record<string, RestContract>;
}

export interface RestContract {
    rest: {
        value: string;
        mimeType: 'application/json';
    };
}

export type SwaggerDefinition = object;

export interface Pact {
    provider?: { name?: string };
    interactions: Array<unknown>;
    [x: string]: any;
}
