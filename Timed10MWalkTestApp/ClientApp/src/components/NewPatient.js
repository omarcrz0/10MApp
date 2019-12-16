import React, { Component } from "react"
import './PatientStyling.css';

import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Radio, Button } from "react-bootstrap"


export class NewPatient extends Component {
    constructor() {
        super()


        this.state = {
            //These are attributes for a patient
            Name: "",
            Email: "",
            Gender: "",

            //Flag to verify for submit correctness/complete
            submitRes: null,
        }

        //Handlers to update states in elements/add new patient
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Function to handle state changes in elemnents
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }


    //Submit form to create a new patient
    handleSubmit(event) {
        event.preventDefault();
        //Create object to be sent to server side in order to add new patient
        const data = { Name: this.state.Name, Gender: this.state.Gender, Email: this.state.Email };
        const url = "/api/Patient/newPatient";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            //If Sucessfully added patient, change helpblock content.
            .then(response => response === 1 ? this.setState({
                SubmitRes: 1
            }) : this.setState({
                SubmitRes: 0
            }));

    }

    render() {

        return <div> <h3 style={{ textAlign: "center" }}> New Patient Form </h3 >
            <Form className='new-patient-form' >
                
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Full Name</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Enter text" name="Name" onChange={this.handleChange} />
                </FormGroup>{' '}

                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" name="Email" placeholder="username@example.com" onChange={this.handleChange} />
                </FormGroup>{' '}

                <FormGroup>
                    <ControlLabel>Gender</ControlLabel>{' '}
                    <Radio name="Gender"
                        inline
                        value="Female"
                        onChange={this.handleChange}>
                        Female
                </Radio>{' '}
                    <Radio name="Gender"
                        inline
                        value="Male"
                        onChange={this.handleChange}>
                        Male
                </Radio>{' '}
                </FormGroup>{' '}

                <Button onClick={this.handleSubmit} > Submit</Button>
                {this.state.SubmitRes === 1 ? <HelpBlock style={{ color: "#5cb85c" }}>Test form succesfully uploaded </HelpBlock> :
                    <HelpBlock style={{ color: "#d9534f" }}>Please fill all entries. </HelpBlock>}
            </Form>
            </div>
    }

}
export default NewPatient