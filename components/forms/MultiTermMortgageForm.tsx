import { useState } from "react"
import { Button, Form, FormField, Grid, GridColumn, GridRow, Header, Input, Label, List, Radio, Segment, Select } from "semantic-ui-react"
import { clearMortgage, getMortgage } from "../../services/MortgageService";

export const MultiTermMortgageForm = () => {

    const [interest, setInterest] = useState<number | string>('');
    const [loanAmount, setLoanAmount] = useState<number | string>('');
    const [term, setTerm] = useState<number | string>('');

    const [interestError, setInterestError] = useState<string>();
    const [mortgageError, setMortgageError] = useState<string>();
    const [termError, setTermError] = useState<string>();

    const [ enableMulti, setEnableMulti ] = useState<boolean>(false);
    const [ multiInput, setMultiInput ] = useState<any[]>([{ month: '', value: ''}]);

    const handleInterestChange = (event: any) => setInterest(event.target.value);
    const handleLoanAmountChange = (event: any) => setLoanAmount(event.target.value);
    const handleTermChange = (event: any) => setTerm(event.target.value);

    const dateOptions = [
        { key: '0', value: '0', text: 'zero' },
        { key: '1', value: '1', text: 'one' },
        { key: '2', value: '2', text: 'two' }
    ];

    const handleMultiInterestChange = (event: any, index: number) => {
        const { name, value } = event.target;
        const list = [ ...multiInput ];
        list[index][name] = value;
        setMultiInput(list);
    }

    const handeMultiMonthChange = (event: any, index: number) => {
        console.log(index);
        console.log(event);
        console.log(event.target.textContent)
        const { name, value } = event.target;
        const list = [ ...multiInput ];
        list[index].month = dateOptions.find(item => item.text === event.target.textContent)?.key;
        setMultiInput(list);
    }

    const addTerm = () => {
        setMultiInput(array => ([ ...array, { month: '', value: ''}]));
    }

    const clearData = () => {
        setLoanAmount('');
        setTerm('');
        setMultiInput(() => [{ month: '', value: ''}]);
        clearMortgage();
    }

    const sendData = () => {
        console.log(multiInput);
        // if (!loanAmount) {
        //     setMortgageError('Please enter a mortgage amount');
        // } else if (loanAmount <= 0) {
        //     setMortgageError('Please enter a valid mortgage value');
        // } else {
        //     setMortgageError('');
        // }
        // if (!interest) {
        //     setInterestError('Please enter your interest rate');
        // } else if (interest <= 0) {
        //     setInterestError('Please enter a valid interest rate');
        // } else {
        //     setInterestError('');
        // }
        // if (!term) {
        //     setTermError('Please enter a mortgage term');
        // } else if (term <= 0) {
        //     setTermError('Please enter a valid term');
        // } else {
        //     setTermError('');
        // }
        // if (!mortgageError && !interestError && !termError) {
        //     getMortgage({ interest, loanAmount, term });
        // }
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
                {multiInput.map((input, index) => (
                    <List.Item key={index}>
                        <Grid stackable>
                            <GridRow columns={1}>
                                <GridColumn>
                                    <Select name="month" placeholder="select an option" options={dateOptions} onChange={event => handeMultiMonthChange(event, index)} value={input.month} />
                                    <Input fluid name="value" size="mini" icon='percent' type="number" placeholder="Interest rate" value={input.value} onChange={event => handleMultiInterestChange(event, index)} />
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </List.Item>
                ))}
                <Button onClick={addTerm} >Add</Button>
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
