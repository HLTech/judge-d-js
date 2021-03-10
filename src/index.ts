import { defineArgs } from './utils/define-args';
import { publish } from './commands/publish';

export async function run(process: NodeJS.Process) {
    const argv = defineArgs(process.argv.slice(2));

    if (argv._.includes('publish')) {
        try {
            await publish(argv);
        } catch (e) {
            process.exit(1);
        }
    }
}
