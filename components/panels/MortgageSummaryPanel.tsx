import { Component } from "react"
import { Header, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react"
import { dataService } from "../../services/DataService"
import { numberFormat } from "../../services/utilService";

class MortgageSummaryPanel extends Component {

    state = {
        payment: 0,
        totalInterest: 0,
        totalLoan: 0
    }

    componentDidMount() {
        dataService.mortgageSummary.subscribe((data: any) => {
            console.log(data);
            const { payment, totalInterest, totalLoan } = data;
            this.setState({
                payment: payment,
                totalInterest: totalInterest,
                totalLoan: totalLoan
            });
        });
    }

    render() {
        return (
            <div style={{padding: '0 32px 0 16px'}}>
                {this.state.payment > 0 && (
                    <Segment raised color="teal">
                        <Header as="h1" color="teal" textAlign="center">Mortgage summary</Header>
                        <Table unstackable>
                            <TableBody>
                                <TableRow>
                                    <TableCell collapsing>
                                        <Header as="h3">Monthly payment:</Header>
                                    </TableCell>
                                    <TableCell>
                                        <Header as="h3">{ numberFormat(this.state.payment)}</Header>
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
