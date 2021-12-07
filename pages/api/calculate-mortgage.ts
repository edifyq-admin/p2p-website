// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { calculateRequiredPayments } from './custom-payment';

type PaymnentDetail = {
    balance: number,
    date: Date,
    displayDate: string,
    interest: number,
    month: number,
    payment: number,
    principal: number
}

const calculateDetail = ({ mortgage, paymentMonths, rate }: { mortgage: number, paymentMonths: number, rate: number }) => {
    const array: PaymnentDetail[] = [];
    for (let i = paymentMonths; i > 0; i--) {
        const payment = calculateRequiredPayments({ mortgage, monthlyRate: rate / 100 / 12, term: i});
        const interest = mortgage * (rate / 100 / 12);
        const principal = payment - interest;
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const date = new Date(year, month + (paymentMonths * 1) - i, 1);
        array.push({
            balance: mortgage,
            date,
            displayDate: `${new Intl.DateTimeFormat('en', { month: 'short' }).format(date)} ${new Intl.DateTimeFormat('en', { year: 'numeric'}).format(date)}`,
            interest,
            month: paymentMonths - i + 1,
            payment,
            principal
        });
        mortgage -= principal;
    }
    return array;
}

const calculateMonthlyPayment = ({ mortgage, paymentMonths, rate }: { mortgage: number, paymentMonths: number, rate: number }) => {
    const monthlyInterest = rate / 100 / 12;
    const factor = Math.pow(1 + monthlyInterest, paymentMonths);
    return (mortgage * factor * monthlyInterest) / (factor - 1);
}

export const calculateMortgage = ({ mortgage, period, rate}: {mortgage: number, period: number, rate: number}) => {
    const payment = calculateRequiredPayments({ mortgage, monthlyRate: rate / 100 / 12, term: period})
    const detail = calculateDetail({ mortgage, paymentMonths: period, rate });
    const totalInterest = detail.reduce((sum, item) => sum += item.interest, 0);
    return { detail, mortgage: mortgage * 1, payment, period, rate, totalInterest, totalLoan: mortgage * 1 + totalInterest };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { mortgage, period, rate } = req.body;
        return res.status(200).json(calculateMortgage({ mortgage, period, rate }));
    }
    return res.status(200).json({ name: 'Mortgage calculator' })
}
