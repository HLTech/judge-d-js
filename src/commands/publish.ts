import { generateContractsForm } from '../utils/generate-contracts-form';
import { CliArguments } from '../utils/define-args';
import { readPacts } from '../utils/read-pacts';
import { buildUrl } from '../utils/build-url';
import { postPacts } from '../utils/post-pacts';

export async function publish(argv: CliArguments) {
    const { pactsDir, serviceName, url, serviceVersion } = argv;

    const pacts = readPacts(pactsDir);
    const contractsForm = generateContractsForm(pacts);
    const judgeDUrl = buildUrl(url, serviceName, serviceVersion);

    await postPacts(judgeDUrl, contractsForm);
}
