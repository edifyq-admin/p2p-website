import { useState } from "react"
import { Button, Form, FormField, Grid, GridColumn, GridRow, Input, Label, List } from "semantic-ui-react"
import { clearMortgage, getMortgage } from "../../services/MortgageService";

export const MortgageInputForm = () => {

    const [interest, setInterest] = useState<number | string>('');
    const [loanAmount, setLoanAmount] = useState<number | string>('');
    const [term, setTerm] = useState<number | string>('');

    const [interestError, setInterestError] = useState<string>();
    const [mortgageError, setMortgageError] = useState<string>();
    const [termError, setTermError] = useState<string>();

    const handleInterestChange = (event: any) => setInterest(event.target.value);
    const handleLoanAmountChange = (event: any) => setLoanAmount(event.target.value);
    const handleTermChange = (event: any) => setTerm(event.target.value);

    const clearData = () => {
        setInterest('');
        setLoanAmount('');
        setTerm('');
        clearMortgage();
    }

    const sendData = () => {
        if (!loanAmount) {
            setMortgageError('Please enter a mortgage amount');
        } else if (loanAmount <= 0) {
            setMortgageError('Please enter a valid mortgage value');
        } else {
            setMortgageError('');
        }
        if (!interest) {
            setInterestError('Please enter your interest rate');
        } else if (interest <= 0) {
            setInterestError('Please enter a valid interest rate');
        } else {
            setInterestError('');
        }
        if (!term) {
            setTermError('Please enter a mortgage term');
        } else if (term <= 0) {
            setTermError('Please enter a valid term');
        } else {
            setTermError('');
        }
        if (!mortgageError && !interestError && !termError) {
            getMortgage({ interest, loanAmount, term });
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
                        <GridRow columns={2}>
                            <GridColumn>
                                <Input fluid size="mini" icon='percent' type="number" placeholder="Interest rate" value={interest} onChange={handleInterestChange} />
                                {interestError && <Label basic color="red" pointing>
                                    {interestError}
                                </Label>}
                            </GridColumn>
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
