import axios from 'axios';
import { defineArgs } from './utils/define-args';
import { publish } from './commands/publish';
import { generateReport } from './utils/generate-report';
import { getValidationResults } from './utils/get-validation-results';
import { writeReport } from './utils/write-report';

export async function run(process: NodeJS.Process) {
    const argv = defineArgs(process.argv.slice(2));

    const command = argv._[0];
    try {
        if (command === 'publish') {
            await publish(argv);
        } else if (command === 'verify') {
            const validationResults = await getValidationResults(argv);

            const hasAnyInteractionFailed = validationResults.some((result) =>
                result.interactions.some(
                    (interaction) => interaction.validationResult === 'FAILED'
                )
            );

            if (argv.outFile) {
                const htmlReport = await generateReport(validationResults);

                writeReport(argv.outFile, htmlReport);
            }

            if (hasAnyInteractionFailed) {
                console.error('Validation failed for one or more interactions');
                process.exit(1);
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error', error.toJSON());
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}
