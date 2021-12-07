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

export const calculateDate = (months: number) => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    return new Date(year, month + months, 1);
}

export const formatDate = (date: Date) => {
    return `${new Intl.DateTimeFormat('en', { month: 'short' }).format(date)} ${new Intl.DateTimeFormat('en', { year: 'numeric'}).format(date)}`;
}

const calculateDetail = ({ mortgage, paymentMonths, rate }: { mortgage: number, paymentMonths: number, rate: number }) => {
    const array: PaymnentDetail[] = [];
    for (let i = paymentMonths; i > 0; i--) {
        const payment = calculateRequiredPayments({ mortgage, monthlyRate: rate / 100 / 12, term: i});
        const interest = mortgage * (rate / 100 / 12);
        const principal = payment - interest;
        const date = calculateDate((paymentMonths * 1) - i);
        array.push({
            balance: mortgage,
            date,
            displayDate: formatDate(date),
            interest,
            month: paymentMonths - i + 1,
            payment,
            principal
        });
        mortgage -= principal;
    }
    return array;
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
