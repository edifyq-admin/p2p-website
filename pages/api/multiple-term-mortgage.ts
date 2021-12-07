import { NextApiRequest, NextApiResponse } from "next";
import { calculateRequiredPayments } from "./custom-payment";

type MortgageInput = {
    mortgage: number;
    rates: MortgageInputRates[];
    term: number;
}

type MortgageInputRates = {
    month: number;
    rate: number;
}

const calculateDetails = ({ mortgage, rates, term}: MortgageInput) => {
    let payments = [];
    const ratesArray = spreadRates({rates, term});
    const monthlyRatesArray = ratesArray.map(rate => rate / 100 / 12);
    for (let i=0; i<term && mortgage > 0; i++) {
        const month = i + 1;
        const payment = calculateRequiredPayments({ mortgage, monthlyRate: monthlyRatesArray[i], term: term - month})
        const interest = mortgage * monthlyRatesArray[i];
        const principal = payment - interest;
        payments.push({
            balance: mortgage,
            displayDate: formatDate(i),
            interest,
            month: i,
            payment,
            principal,
            rate: ratesArray[i]
        });
        mortgage -= principal;
    }
    return payments;
}

export const calculateMultiMortgage = ({ mortgage, rates, term }: MortgageInput) => {
    const detail = calculateDetails({ mortgage, rates, term });
    const payments = reducePayments({ detail });
    const totalInterest = detail.reduce((sum, item) => sum += item.interest, 0);
    return { detail, mortgage, payments, term, totalInterest, totalLoan: mortgage * 1 + totalInterest }
};

export const formatDate = (extraMonths: number) => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = new Date(year, month + extraMonths, 1);
    return `${new Intl.DateTimeFormat('en', { month: 'short' }).format(date)} ${new Intl.DateTimeFormat('en', { year: 'numeric'}).format(date)}`;
}

const reducePayments = ({ detail }: {detail: any[]}) => {
    let payments = detail.reduce((array, item) => {
        const payment = array.find((monthly: any) => monthly.rate === item.rate);
        if (!payment) {
            array.push(item);
        }
        return array;
    }, []).map((item: any) => {
        const { month, payment, rate } = item;
        return { from: formatDate(month), month, payment, rate };
    });
    for (let i=1; i<payments.length; i++) {
        payments[i - 1].to = formatDate(payments[i].month - 1);
    }
    payments[payments.length - 1].to = formatDate(detail[detail.length - 1].month);
    return payments;
}

export const spreadRates = ({ rates, term }: { rates: MortgageInputRates[], term: number}) => {
    let array: number[] = new Array(term);
    rates.forEach(item => array.fill(item.rate, item.month, term));
    return array;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { mortgage, rates, term } = req.body;
        return res.status(200).json(calculateMultiMortgage({ mortgage, rates, term }));
    }
    return res.status(200).json({ name: 'Multiple term calculator' })
}
