import { Subject } from 'rxjs';

const mortgageBreakdownSubject = new Subject();
const mortgageSummarySubject = new Subject();

export const updateMortgageDetails = (data: any) => {
    const { detail, mortgage, payment, period, rate, totalInterest, totalLoan } = data;
    mortgageSummarySubject.next({ mortgage, payment, period, rate, totalInterest, totalLoan });
    mortgageBreakdownSubject.next({ detail });
}

export const dataService = {
    mortgageBreakdown: mortgageBreakdownSubject.asObservable(),
    mortgageSummary: mortgageSummarySubject.asObservable()
}
