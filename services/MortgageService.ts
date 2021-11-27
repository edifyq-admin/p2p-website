import axios from 'axios';
import { clearData, updateMortgageDetails } from './DataService';

export const clearMortgage = () => clearData();

export const getMortgage = async({ interest, loanAmount, term }: { interest: number | string, loanAmount: number | string, term: number | string }) => {
    await axios.post('/api/calculate-mortgage', { rate: interest, mortgage: loanAmount, period: term })
        .then(result => result.data)
        .then(data => updateMortgageDetails(data));
}
