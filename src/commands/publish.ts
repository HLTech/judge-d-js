import { generateContractsForm } from '../utils/generate-contracts-form';
import { CliPublishArguments } from '../utils/define-args';
import { readPacts } from '../utils/read-pacts';
import { postServiceContractsForm } from '../api/post-service-contracts-form';
import { URL } from 'url';

export async function publish(argv: CliPublishArguments) {
    const { pactsDir, serviceName, url, serviceVersion } = argv;

    const pacts = readPacts(pactsDir);
    const contractsForm = generateContractsForm(pacts);
    const judgeDUrl = new URL(
        `./contracts/services/${serviceName}/versions/${serviceVersion}`,
        url
    ).toString();

    await postServiceContractsForm(judgeDUrl, contractsForm);
}
