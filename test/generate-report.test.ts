import { generateReport } from '../src/utils/generate-report';
import { validationResultMockFactory } from './mocks/validationResult.mock';

describe('generateReport', () => {
    test('returns html report with all interactions passed', async () => {
        const validationResultsMock = [validationResultMockFactory.build()];

        const report = await generateReport(validationResultsMock);

        expect(report).toMatchSnapshot();
    });

    test('returns html report with failed interaction', async () => {
        const validationResultsMock = [
            validationResultMockFactory.build({
                interactions: [
                    {
                        validationResult: 'OK',
                        interactionName: 'interaction name',
                        errors: [],
                    },
                    {
                        validationResult: 'FAILED',
                        interactionName: 'failed interaction',
                        errors: ['Provider can not be found.'],
                    },
                ],
            }),
        ];

        const report = await generateReport(validationResultsMock);

        expect(report).toMatchSnapshot();
    });
});
