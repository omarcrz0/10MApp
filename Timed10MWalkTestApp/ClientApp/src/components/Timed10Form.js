import React, { Component } from 'react';
import { Alert, Form, FormGroup, ControlLabel, FormControl, Button, HelpBlock, Radio } from 'react-bootstrap';
import './PatientStyling.css';
import PatientInfo from "./PatientInfo"



//import { Alert, Form, FormControl, Row, FormGroup, Col, Radio } from 'react-bootstrap';


export class Timed10Form extends Component {

    constructor() {
        super()

        this.state = {

            //Add states to Timed10Form test attributes
            RunS1: 0,
            RunS2: 0,
            RunS3: 0,
            testSpeed: null,
            assistiveDevice: "",
            Notes: "",

            //Buffer for selected user (required in order to add a new form) 
            Patient: null,
            patientName : "",
            displayPatients: [],
            focusName: false,

            //Flag let user know the entry was sucessful. 
            selectedUser: 0 ,
            SubmitRes:0
        }

        //Function to submit test form completed and submit button was hit
        this.submitTest = this.submitTest.bind(this)

        //Function to handle input element changes and set new state
        this.handleChange = this.handleChange.bind(this) 

        //Function to search for patient when inputting entries on patient search textbox
        this.searchPatient = this.searchPatient.bind(this)

        //Function to setnew states when geting focus on search textbox
        this.focusSearchName = this.focusSearchName.bind(this)

        //Function to select a user from the searched patients using search textbox
        this.selectUser = this.selectUser.bind(this)
    }

    //Function to set new states for the selected patient (options are given by the search function)
    selectUser(patient) {
        this.setState({
            patientName: patient.name,
            focusName: false,
            Patient: patient,
            selectedUser: 1,
        })

    }

    submitTest(event) {

        //Calculate average time per run and average velocity. If one of the entries is not filled, test wont be uploaded
        const averageTimePerRun = parseFloat(parseFloat(this.state.RunS1) +
                                    parseFloat(this.state.RunS2) + parseFloat(this.state.RunS3)) / 3;
        const averageVelocity = parseFloat(averageTimePerRun) / 6;

        //Create object and append patient information
        const data = {
            RunS1: this.state.RunS1,
            RunS2: this.state.RunS2,
            RunS3: this.state.RunS3,
            testSpeed: this.state.testSpeed,
            averageTimePerRun: averageTimePerRun,
            averageVelocity: averageVelocity,
            assistiveDevice: this.state.assistiveDevice,
            Notes: this.state.Notes,
            Patient: this.state.Patient
        }
        const url = "/api/Timed10MTest/addTestRun";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            //If test upload was sucessful change helpblock text
            .then(response => response === 1 ? this.setState({
                SubmitRes: 1
            }) : this.setState({
                SubmitRes: 0
            }))

    }

    //Function to add div showing search options (function triggers when search box gets focus)
    focusSearchName(event) {
        this.setState({
            focusName: true
        })

    }

    //Function to search for patient given inputs on search textbox
    searchPatient(event) {

        const { name, value } = event.target
        //If the user enters too many letters at once, don't query, prevent exessive query request in
        // small time frame  (will display loading div meanwhile user types too fast )
        // The timeout will be cleared on each entry, but a new timeout will be given on each entry
        // (This will give us the wanted behavior )
        if (typeof this.timeoutID !== "undefined") {
            clearTimeout(this.timeoutID);
        }

        //Update name input value
        this.setState({
            [name]: value,
        })

        if (value.length > 2) {
            const url = "/api/Patient/likePatients?patientName=" + value;


            this.setState({
                displayPatients:
                    <Alert className="patient-alert">
                        Loading...
                    </Alert>
            })

            this.timeoutID = setTimeout(function () {
                fetch(url, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.json())
                    .catch(error => console.log("error: ", error))
                    .then(response => this.setState({
                        displayPatients: response.map(patient =>
                            <PatientInfo key={patient.id} clickUser={() => { this.selectUser(patient) }} patient={patient} />)

                    })); //fetch bracket
            }.bind(this), 300);
        }// if bracket

        //If input on textbox is less or equal than 2, update states

        else {
            this.setState({
                [name]: value,
            })//set state bracket
        }//else bracket
    }

    //Function to update states on input elements 
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }



    render() {

        return <div>

            <br />
            <br />

            <FormGroup className='search-patient'>
                <ControlLabel style={{ fontSize: 20 }}>Search Patient</ControlLabel>{' '}
                <FormControl
                    type="text" 
                    placeholder="Enter name" 
                    bsSize='lg' 
                    name="patientName" 
                    value={this.state.patientName}  
                    onChange={this.searchPatient}
                    onFocus={this.focusSearchName} />
                <HelpBlock> Select a patient from the list </HelpBlock>
                {this.state.focusName ? 
                    <div style={{ maxHeight: 300, overflowY: 'scroll' }}> {this.state.displayPatients} </div> 
                    : null}
            </FormGroup>{' '}

            <h2  className='new-patient-form'>Timed 10 Meter Test Form </h2>
            <Form className='new-patient-form text-center' >

                <FormGroup>
                    <ControlLabel>First Run</ControlLabel>{' '}
                    <FormControl type="text" name="RunS1" placeholder="(seconds)" onChange={this.handleChange} />
                </FormGroup>{' '}

                <FormGroup>
                    <ControlLabel>Second Run</ControlLabel>{' '}
                    <FormControl type="text" name="RunS2" placeholder="(seconds)" onChange={this.handleChange} />
                </FormGroup>{' '}

                <FormGroup>
                    <ControlLabel>Third Run</ControlLabel>{' '}
                    <FormControl type="text" name="RunS3" placeholder="(seconds)" onChange={this.handleChange} />
                </FormGroup>{' '}

                <FormGroup>
                    <ControlLabel>Test Speed</ControlLabel>{' '}

                    <Radio name="testSpeed"
                        inline
                        value="Preferred"
                        onChange={this.handleChange}>
                        Preferred
                    </Radio>{' '}
                        <Radio name="testSpeed"
                            inline
                            value="Fast"
                            onChange={this.handleChange}>
                            Fast
                    </Radio>{' '}
                </FormGroup>{' '}

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Assisting Device</ControlLabel>
                    <FormControl
                        componentClass="textarea" 
                        name="assistiveDevice" 
                        onChange={this.handleChange}/>
                    <HelpBlock> If no assisting device, please add N/A</HelpBlock>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Notes</ControlLabel>
                    <FormControl 
                        name='Notes' componentClass="textarea" 
                        onChange={this.handleChange} />
                    <HelpBlock> Add any anotations</HelpBlock>
                </FormGroup>

                {this.state.selectedUser ? <Button onClick={this.submitTest}>
                    Submit Test
                </Button>
                    : null
                }
                {this.state.SubmitRes === 1 ? <HelpBlock style={{ color: "#5cb85c" }}>Test form succesfully uploaded </HelpBlock> :
                    <HelpBlock style={{ color: "#d9534f" }}>Please fill all entries. </HelpBlock>}
            </Form>
        </div>

    }

}

export default Timed10Form
