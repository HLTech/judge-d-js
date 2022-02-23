import { ServiceContractsForm } from '../utils/generate-contracts-form';
import axios from 'axios';

export function postServiceContractsForm(
    url: string,
    pacts: ServiceContractsForm
) {
    return axios.post(url, pacts);
}
