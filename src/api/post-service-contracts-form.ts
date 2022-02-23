import { ServiceContractsForm } from '../types';
import axios from 'axios';

export function postServiceContractsForm(
    url: string,
    pacts: ServiceContractsForm
) {
    return axios.post(url, pacts);
}
