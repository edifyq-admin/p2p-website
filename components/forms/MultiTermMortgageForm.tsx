import { useState } from "react"
import { Button, Form, FormField, Grid, GridColumn, GridRow, Input, Label, List, ListItem, Message, Select, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react"
import { clearMortgage, getMultiMortgage } from "../../services/MortgageService";

export const MultiTermMortgageForm = () => {

    const [interest, setInterest] = useState<number | string>('');
    const [loanAmount, setLoanAmount] = useState<number | string>('');
    const [term, setTerm] = useState<number | string>('');

    const [interestError, setInterestError] = useState<boolean>(false);
    const [mortgageError, setMortgageError] = useState<string>();
    const [termError, setTermError] = useState<string>();

    const [ displayOptions, setDisplayOptions ] = useState<any[]>([]);
    const [ enableMulti, setEnableMulti ] = useState<boolean>(false);
    const [ month, setMonth ] = useState<any>(0);
    const [ multiInput, setMultiInput ] = useState<any[]>([]);
    const [ options, setOptions ] = useState<any[]>([]);

    const handleLoanAmountChange = (event: any) => setLoanAmount(event.target.value);
    const handleTermChange = (event: any) => setTerm(event.target.value);

    const populateOptions = () => {
        let options: any[] = [];
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        for (let i=0; i<term; i++) {
            const future = new Date(year, month + i, 1);
            options.push({
                key: i, value: i,
                text: `${new Intl.DateTimeFormat('en', { month: 'short' }).format(future)} ${new Intl.DateTimeFormat('en', { year: 'numeric'}).format(future)}`
            });
        }
        return options;
    }

    const addTerm = () => {
        if (!term) {
            setTermError('Please enter a mortgage term');
            return;
        }
        setTermError('');
        if (!options.length) {
            const array = createOptions(0);
            setOptions(array);
            setDisplayOptions(array);
            setEnableMulti(true);
            return;
        }
        if (interest === '') {
            setInterestError(true);
            return;
        }
        setInterestError(false);
        setMultiInput(array => [...array, {interest, month}]);
        setDisplayOptions(options.filter(item => item.key > month));
        setMonth((value: any) => value += 1);
    }

    const clearData = () => {
        setOptions([]);
        setDisplayOptions([]);
        setLoanAmount('');
        setTerm('');
        setMultiInput([]);
        setEnableMulti(false);
        setInterest('');
        setMonth(0);
        clearMortgage();
    }

    const createOptions = (start: number) => {
        return populateOptions().filter(item => item.key >= start);
    }

    const sendData = () => {
        if (!loanAmount) {
            setMortgageError('Please enter a mortgage amount');
        } else if (loanAmount <= 0) {
            setMortgageError('Please enter a valid mortgage value');
        } else {
            setMortgageError('');
        }
        if (!term) {
            setTermError('Please enter a mortgage term');
        } else if (term <= 0) {
            setTermError('Please enter a valid term');
        } else {
            setTermError('');
        }
        if (loanAmount && term) {
            getMultiMortgage({
                mortgage: Number(loanAmount) * 1,
                rates: multiInput.map(item => ({ month: Number(item.month), rate: Number(item.interest)})),
                term: Number(term) * 1
            })
        }
    }

    return (
        <Form>
            <List relaxed size="huge">
                <List.Item>
                    <FormField>
                        <Input fluid size="mini" icon='pound sign' iconPosition='left' type="number" placeholder="Mortgage amount" value={loanAmount} onChange={handleLoanAmountChange} />
                        {mortgageError && <Label basic color="red" pointing>
                            {mortgageError}
                        </Label>}
                    </FormField>
                </List.Item>
                <List.Item>
                    <Grid stackable>
                        <GridRow columns={1}>
                            <GridColumn>
                                <Input fluid size="mini" icon='calendar alternate outline' iconPosition="left" label={{ basic: true, content: 'Months' }} labelPosition="right" type="number" placeholder="Term" value={term} onChange={handleTermChange} />
                                {termError && <Label basic color="red" pointing>
                                    {termError}
                                </Label>}
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </List.Item>
                <List.Item>
                    <Message info><p>Add the start of each term with the interest rate for that period here.</p></Message>
                </List.Item>
                {multiInput.length > 0 && (
                    <ListItem>
                        <Table size="small" striped color="teal" textAlign="center" unstackable>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell textAlign="center">Start</TableHeaderCell>
                                    <TableHeaderCell textAlign="center">Interest Rate</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {multiInput.map(item => (
                                    <TableRow key={item.month}>
                                        <TableCell>{options[item.month]?.text}</TableCell>
                                        <TableCell>{item.interest}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ListItem>
                )}
                {enableMulti && (<ListItem>
                    <Grid>
                        <GridRow columns={2}>
                            <GridColumn>
                                <Select style={{fontSize: '1.1rem', width: '100%'}} name="month" options={displayOptions} value={month} onChange={(e, option) => setMonth(option.value)} />
                            </GridColumn>
                            <GridColumn stretched>
                                <Input fluid name="value" size="mini" icon="percent" type="number" placeholder="Interest rate" value={interest} onChange={e => setInterest(e.target.value)} />
                                {interestError && <Label basic color="red" pointing>Please enter a valid interest rate</Label>}
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </ListItem>)}
                <List.Item>
                    <Button fluid color="teal" onClick={addTerm} >Add Mortgage Term</Button>
                </List.Item>
                <List.Item>
                    <Grid columns={2} stackable>
                        <Grid.Row>
                            <GridColumn>
                                <Button fluid primary size="massive" onClick={sendData}>Calculate</Button>
                            </GridColumn>
                            <GridColumn>
                                <Button fluid secondary size="massive" onClick={clearData}>Reset</Button>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </List.Item>
            </List>
        </Form>
    )
}
