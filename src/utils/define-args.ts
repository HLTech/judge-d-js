import yargs from 'yargs';

export interface CliArguments {
    url: string;
    serviceName: string;
    serviceVersion: string;
}

export interface CliPublishArguments extends CliArguments {
    pactsDir?: string;
    swaggerFile?: string;
}

export interface CliVerifyArguments extends CliArguments {
    environment: string;
    outFile?: string;
}

const commonArguments: Record<string, yargs.Options> = {
    url: {
        type: 'string',
        demandOption: true,
        describe: 'Url to judge-d instance',
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
};

export function defineArgs(
    cliArgs: string[]
): yargs.Arguments<CliPublishArguments & CliVerifyArguments> {
    return yargs(cliArgs)
        .command<CliPublishArguments & CliVerifyArguments>(
            'publish',
            'Publish contracts',
            (yargs) => {
                return yargs
                    .options({
                        ...commonArguments,
                        pactsDir: {
                            type: 'string',
                            describe: 'Path to directory with pacts',
                        },
                        swaggerFile: {
                            type: 'string',
                            describe: 'Path to swagger json file',
                        },
                    })
                    .check(({ pactsDir, swaggerFile }) => {
                        if (!pactsDir && !swaggerFile) {
                            throw new Error(
                                'Either pactsDir or swaggerFile argument must be passed.'
                            );
                        }

                        return true;
                    });
            }
        )
        .command('verify', 'Verify contracts', (yargs) => {
            return yargs.options({
                ...commonArguments,
                environment: {
                    type: 'string',
                    demandOption: true,
                    describe: 'Environment name',
                },
                outFile: {
                    type: 'string',
                    describe: 'Path with HTML report filename, ex. report.html',
                },
            });
        })
        .strict()
        .demandCommand(1, 'You need at least one command before moving on')
        .group(['pactsDir', 'swaggerFile'], 'Required one of:')
        .help().argv;
}
