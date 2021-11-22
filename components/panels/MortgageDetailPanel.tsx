import { Component } from "react";
import { Header, Segment, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { dataService } from "../../services/DataService";
import { numberFormat } from "../../services/utilService";

class MortgageDetailPanel extends Component {

    state = {
        detail: []
    }

    componentDidMount() {
        dataService.mortgageBreakdown.subscribe((data: any) => this.setState({ detail: data.detail }));
    }
    render() {
        return (
            <div>
                {this.state.detail.length > 0 && (
                    <Segment color="grey" raised>
                        {/* <div>{JSON.stringify(this.state.detail, null, 2)}</div> */}
                        <Header as="h1" color="grey" textAlign="center">Mortgage monthly breakdown</Header>
                        <Table striped unstackable>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell textAlign="center">Month</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Principal balance</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Monthly payment</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Principal payment</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Interest payment</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.detail.map((paymentLine: any) => (
                                    <TableRow key={paymentLine.month}>
                                        <TableCell textAlign="center">{paymentLine.displayDate}</TableCell>
                                        <TableCell textAlign="center">{numberFormat(paymentLine.balance)}</TableCell>
                                        <TableCell textAlign="center">{numberFormat(paymentLine.payment)}</TableCell>
                                        <TableCell textAlign="center">{numberFormat(paymentLine.principal)}</TableCell>
                                        <TableCell textAlign="center">{numberFormat(paymentLine.interest)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Segment>
                )}
            </div>
        )
    }
}

export { MortgageDetailPanel }
