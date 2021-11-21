import { Subject } from 'rxjs';

const mortgageSummarySubject = new Subject();

export const updateMortgageDetails = (data: any) => {
    const { detail, mortgage, payment, period, rate, totalInterest, totalLoan } = data;
    mortgageSummarySubject.next({ mortgage, payment, period, rate, totalInterest, totalLoan });
}

export const dataService = {
    mortgageSummary: mortgageSummarySubject.asObservable()
}
