import { NextApiRequest, NextApiResponse } from "next";
import { calculateDate, calculateMortgage, formatDate } from "./calculate-mortgage";
import { spreadRates } from "./multiple-term-mortgage";

type MortgageInput = {
    custom: MortgageCustomInputs[];
    mortgage: number;
    rates: MortgageInputRates[];
    term: number;
}

type MortgageCustomInputs = {
    month: number;
    payment: number;
}

type MortgageInputRates = {
    month: number;
    rate: number;
}

export const calculateRequiredPayments = ({ mortgage, monthlyRate, term}: { mortgage: number, monthlyRate: number, term: number}) => {
    const factor = Math.pow(1 + monthlyRate, term);
    return (mortgage * factor * monthlyRate) / (factor - 1);
}

const calculateDetails = ({ custom, mortgage, rates, term}: MortgageInput) => {
    let payments: any[] = [];
    const ratesArray = spreadRates({ rates, term });
    const monthlyRatesArray = ratesArray.map(rate => rate / 100 / 12);
    for (let i=0; i<term && mortgage > 0; i++) {
        const month = i + 1;
        const requiredPayment = calculateRequiredPayments({ mortgage, monthlyRate: monthlyRatesArray[i], term: term - month});
        const customPayment = custom.find(item => item.month === i);
        let payment = customPayment ? customPayment.payment : requiredPayment;
        const interest = mortgage * monthlyRatesArray[i];
        const principal = customPayment ? customPayment.payment : payment - interest;
        const notComplete = mortgage > requiredPayment;
        const date = calculateDate(i);
        payments.push({
            balance: mortgage,
            displayDate: formatDate(date),
            interest,
            month: i,
            payment: notComplete ? payment : principal,
            principal,
            rate: ratesArray[i],
            requiredPayment: notComplete ? requiredPayment : principal
        });
        mortgage = notComplete ? mortgage - principal : 0;
    }
    return payments;
}

const calculateMultiMortgage = ({ custom, mortgage, rates, term }: MortgageInput) => {
    const detail = calculateDetails({ custom, mortgage, rates, term });
    // const payments = reducePayments({ detail });
    // const totalInterest = detail.reduce((sum, item) => sum += item.interest, 0);
    // return { detail, mortgage, payments, term, totalInterest, totalLoan: mortgage * 1 + totalInterest }
    return { custom, detail, mortgage, rates, term };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { custom, mortgage, rates, term } = req.body;
        return res.status(200).json(rates.length > 1
            ? calculateMultiMortgage({ custom, mortgage, rates, term })
            : calculateMortgage({ mortgage, period: term, rate: rates[0].rate}));
    }
    return res.status(200).json({ name: 'Savings calculator' })
}
