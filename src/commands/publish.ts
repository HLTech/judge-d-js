import { generateExpectations } from '../utils/generate-expectations';
import { CliPublishArguments } from '../utils/define-args';
import { readPacts } from '../utils/read-pacts';
import { postServiceContractsForm } from '../api/post-service-contracts-form';
import { URL } from 'url';
import { readSwagger } from '../utils/read-swagger';
import { generateRestContract } from '../utils/generate-rest-contract';
import { ServiceContractsForm } from '../types';

export async function publish(argv: CliPublishArguments) {
    const { pactsDir, serviceName, url, serviceVersion, swaggerFile } = argv;

    const serviceContractsForm: ServiceContractsForm = {
        capabilities: {},
        expectations: {},
    };

    if (pactsDir) {
        const pacts = readPacts(pactsDir);
        serviceContractsForm.expectations = generateExpectations(pacts);
    }

    if (swaggerFile) {
        const swagger = readSwagger(swaggerFile);
        serviceContractsForm.capabilities = generateRestContract(swagger);
    }

    const postJudgeDServiceContractsFormUrl = new URL(
        `./contracts/services/${serviceName}/versions/${serviceVersion}`,
        url
    ).toString();

    await postServiceContractsForm(
        postJudgeDServiceContractsFormUrl,
        serviceContractsForm
    );
}
