import { buildUrl } from '../src/utils/build-url';

describe('buildUrl', () => {
    const serviceName = 'service-name';
    const serviceVersion = '1.0.0';

    test('builds correct url with root path', () => {
        const url = 'http://judge-d.com';

        expect(buildUrl(url, serviceName, serviceVersion)).toEqual(
            `http://judge-d.com/contracts/services/${serviceName}/versions/${serviceVersion}`
        );
    });

    test('builds correct url with non root path', () => {
        const url = 'http://judge-d.com/route/';

        expect(buildUrl(url, serviceName, serviceVersion)).toEqual(
            `http://judge-d.com/route/contracts/services/${serviceName}/versions/${serviceVersion}`
        );
    });
});
