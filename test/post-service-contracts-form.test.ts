import axios from 'axios';
import { serviceContractsFormMockFactory } from './mocks/serviceContractsForm.mock';
import { postServiceContractsForm } from '../src/api/post-service-contracts-form';

jest.mock('axios');

describe('postServiceContractsForm', () => {
    test('calls API with correct url and data passed as arguments', () => {
        const serviceContractsFormMock = serviceContractsFormMockFactory.build();
        const judgeDUrl = 'http://judge-d.instance.com';
        postServiceContractsForm(judgeDUrl, serviceContractsFormMock);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            judgeDUrl,
            serviceContractsFormMock
        );
    });
});
