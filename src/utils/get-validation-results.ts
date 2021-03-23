import axios from 'axios';
import { CliVerifyArguments } from './define-args';
import { ValidationResult } from './generate-report';
import { stringify } from 'querystring';
import { URL } from 'url';

export async function getValidationResults(argv: CliVerifyArguments) {
    const { serviceName, url, serviceVersion, environment } = argv;

    const query = stringify({ environment });
    const judgeDUrl = new URL(
        `./environment-compatibility-report/${serviceName}:${serviceVersion}?${query}`,
        url
    ).toString();

    const response = await axios.get<ValidationResult[]>(judgeDUrl);
    return response.data;
}
