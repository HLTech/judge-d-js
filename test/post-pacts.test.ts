import axios from 'axios';
import { serviceContractsFormMockFactory } from './mocks/serviceContractsForm.mock';
import { postPacts } from '../src/api/post-pacts';

jest.mock('axios');

describe('postPacts', () => {
    test('calls API with correct url and data passed as arguments', () => {
        const serviceContractsFormMock = serviceContractsFormMockFactory.build();
        const judgeDUrl = 'http://judge-d.instance.com';
        postPacts(judgeDUrl, serviceContractsFormMock);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            judgeDUrl,
            serviceContractsFormMock
        );
    });
});
