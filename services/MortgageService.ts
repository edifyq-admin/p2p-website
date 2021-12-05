import axios from 'axios';
import { clearData, updateMortgageDetails } from './DataService';

export const clearMortgage = () => clearData();

export const getMortgage = ({ interest, loanAmount, term }: { interest: number | string, loanAmount: number | string, term: number | string }) => {
    axios.post('/api/calculate-mortgage', { rate: interest, mortgage: loanAmount, period: term })
        .then(result => result.data)
        .then(data => {
            updateMortgageDetails({payments: [{payment: data.payment}], ...data});
        });
}

export const getMultiMortgage = (input: any) => {
    axios.post('/api/multiple-term-mortgage', input)
        .then(result => result.data)
        .then(data => updateMortgageDetails(data));
}