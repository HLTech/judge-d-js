import { defineArgs } from './utils/define-args';

export function run(process: NodeJS.Process) {
    const argv = defineArgs(process.argv.slice(2));
    console.log(argv);
}
