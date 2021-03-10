export function buildUrl(
    url: string,
    serviceName: string,
    serviceVersion: string
) {
    return `${url}/contracts/services/${serviceName}/versions/${serviceVersion}`;
}
