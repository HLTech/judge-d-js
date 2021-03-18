import { URL } from 'url';

export function buildUrl(
    url: string,
    serviceName: string,
    serviceVersion: string
) {
    return new URL(
        `./contracts/services/${serviceName}/versions/${serviceVersion}`,
        url
    ).toString();
}
