import yargs from 'yargs';

export interface CliArguments {
    url: string;
    pactsDir: string;
    serviceName: string;
    serviceVersion: string;
}

export function defineArgs(cliArgs: string[]): yargs.Arguments<CliArguments> {
    return yargs(cliArgs)
        .command<CliArguments>('publish', 'Publish contracts', (yargs) => {
            yargs.options({
                url: {
                    type: 'string',
                    demandOption: true,
                    describe: 'Url to judge-d instance',
                },
                pactsDir: {
                    type: 'string',
                    demandOption: true,
                    describe: 'Path to directory with pacts',
                },
                serviceName: {
                    type: 'string',
                    demandOption: true,
                    describe: 'Service name',
                },
                serviceVersion: {
                    type: 'string',
                    demandOption: true,
                    describe: 'Service version',
                },
            });
        })
        .strict()
        .demandCommand(1, 'You need at least one command before moving on')
        .help().argv;
}
