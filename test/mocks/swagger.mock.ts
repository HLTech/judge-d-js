export const swaggerFileMock = {
    swagger: '2.0',
    info: {
        description: 'Api Documentation',
        version: '1.0',
        title: 'Api Documentation',
        termsOfService: 'urn:tos',
        contact: {},
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0',
        },
    },
    host: 'localhost',
    basePath: '/',
    tags: [
        {
            name: 'environment-controller',
            description: 'Environment Controller',
        },
    ],
    paths: {
        '/environments/{name}': {
            put: {
                tags: ['environment-controller'],
                summary: 'Update the environment',
                operationId: 'update environment',
                consumes: ['application/json'],
                produces: ['*/*'],
                parameters: [
                    {
                        name: 'name',
                        in: 'path',
                        description: 'name',
                        required: true,
                        type: 'string',
                    },
                    {
                        in: 'body',
                        name: 'services',
                        description: 'services',
                        required: true,
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/definitions/ServiceForm',
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Success',
                    },
                },
            },
        },
    },
    definitions: {
        ServiceForm: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                version: {
                    type: 'string',
                },
            },
        },
    },
};
