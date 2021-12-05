import { useState } from "react"
import { Header, Radio, Segment } from "semantic-ui-react"
import { clearData } from "../../services/DataService"
import { MortgageInputForm } from "../forms/MortgageInputForm"
import { MultiTermMortgageForm } from "../forms/MultiTermMortgageForm"

export const MortgageFormPanel = () => {

    const [ multiTerm, setMultiTerm ] = useState(false)

    const handleToggle = () => {
        clearData();
        setMultiTerm(!multiTerm);
    }

    return (
        <Segment raised color="blue">
            <Header as="h1" color="blue" textAlign="center">Mortgage Form</Header>
            <div>
                <Radio
                    toggle
                    checked={multiTerm}
                    label="Enable multi-term mortgage"
                    onClick={handleToggle}
                />
            </div>
            <br />
            {multiTerm ? <MultiTermMortgageForm /> : <MortgageInputForm />}
        </Segment>
    )
}
