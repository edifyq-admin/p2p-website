import { Component } from "react"
import { Header, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react"
import { dataService } from "../../services/DataService"
import { numberFormat } from "../../services/utilService";

class MortgageSummaryPanel extends Component {

    state = {
        payments: [],
        totalInterest: 0,
        totalLoan: 0
    }

    componentDidMount() {
        dataService.mortgageSummary.subscribe((data: any) => {
            const { payments, totalInterest, totalLoan } = data;
            this.setState({
                payments: payments,
                totalInterest: totalInterest,
                totalLoan: totalLoan
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.payments?.length > 0 && (
                    <Segment raised color="teal">
                        <Header as="h1" color="teal" textAlign="center">Mortgage summary</Header>
                        <Table unstackable>
                            <TableBody>
                                <TableRow>
                                    <TableCell collapsing verticalAlign="top">
                                        <Header as="h3">{`Monthly payment${this.state.payments.length > 1 ? 's' : ''}:`}</Header>
                                    </TableCell>
                                    <TableCell>
                                        {this.state.payments.length > 1 ? this.state.payments.map((item: any) => (
                                            <div>{item.from} - {item.to}: <b>{numberFormat(item.payment)}</b></div>
                                        )) : <Header as="h3">{this.state.payments.map((item: any) => numberFormat(item.payment))}</Header>}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>&nbsp;</TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Header as="h3">Total interest:</Header></TableCell>
                                    <TableCell><Header as="h3">{ numberFormat(this.state.totalInterest)}</Header></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Header as="h3">Total loan:</Header></TableCell>
                                    <TableCell><Header as="h3">{ numberFormat(this.state.totalLoan)}</Header></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Segment>
                )}
            </div>
        )    
    }
}

export { MortgageSummaryPanel }
