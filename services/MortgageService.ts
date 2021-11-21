import axios from 'axios';
import { updateMortgageDetails } from './DataService';

export const getMortgage = async({ interest, loanAmount, term }: { interest: number, loanAmount: number, term: number }) => {
    await axios.post('/api/calculate-mortgage', { rate: interest, mortgage: loanAmount, period: term })
        .then(result => result.data)
        .then(data => updateMortgageDetails(data));
}
