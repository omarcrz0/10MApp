import React, { Component } from "react"
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert } from "react-bootstrap"
import { MdEdit, MdDelete } from "react-icons/md";
import PatientInfo from "./PatientInfo"


export class EditPatient extends Component {
    constructor() {
        super()


        this.state = {
            Name: "",
            Email: "",

            Patients: {},
            displayPatients: null,
            focusName: false,
            Patient: null
            //SearchPatient: ""
        }

        //Function to handle edit/delete action for patients
        this.handleAction = this.handleAction.bind(this)

        //Function to set new states on input element changes
        this.handleChange = this.handleChange.bind(this)

        //Function to search for patient information//Select user to apply changes
        this.searchPatient = this.searchPatient.bind(this)

        //Function to display list of searched patients
        this.focusSearchName = this.focusSearchName.bind(this)

        //Function to select user from list of users
        this.selectUser = this.selectUser.bind(this)

    }

    //Function to handle action between deleting or updating content of the patient (Requires a patient 
    // to be selected in order to get the functionalities/capability) 
    handleAction(action) {

        //Ensure the format of the object goes according to the EF objects
        let data = this.toUpperCamel(this.state.Patient)

        //Adjust object information if need be (depending on the query to be done, this case edit function
        //should have different values relative to the object to be changed)
        if (action === "editPatient")
            data.Email = this.state.Email;
        const url = "/api/Patient/" + action;
        fetch(url, {

            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }

        })
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            //If changes to the database has been sucessful, reload the page
            .then(response => response === 1 ? window.location.reload(true) : console.log("Success", response));

    }

    //Function to select user from the given options when searching (this is used to bind the patient to
    //a variable to be send to the server for processing)
    selectUser(patient) {
        this.setState({
            Patient: patient,
            focusName: false,
        })
    }

    //Function to add div showing search options (function triggers when search box gets focus) 
    focusSearchName(event) {
        this.setState({
            focusName: true
        })
    }

    //Function to search for patient when given search textbot input
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

        //If the textbox has more than 2 characters, try searching for results
        if (value.length > 2) {
            const url = "/api/Patient/likePatients?patientName=" + value;

            //While fetching information let user know searching the DB 
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
                displayPatients: null,
                [name]: value,
            })//set state bracket
        }//else bracket
    }

    //Function to handle changes in input elements and update states
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    //Function to make the object's data be upper camel key for compatibility with EF objects
    toUpperCamel(o) {
        let newO, origKey, newKey, value
        if (o instanceof Array) {
            return o.map(function (value) {
                if (typeof value === "object") {
                    value = this.toUpperCamel(value)
                }
                return value
            })
        } else {
            newO = {}
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString()
                    value = o[origKey]
                    if (value instanceof Array || (value !== null && value.constructor === Object)) {
                        value = this.toUpperCamel(value)
                    }
                    newO[newKey] = value
                }
            }
        }
        return newO
    }

    render() {
        return <div>
            <h3 style={{ textAlign: "center" }}> Edit patient </h3>

            <FormGroup className='edit-search-patient'>
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

            <Form className='edit-patient-form' inline >
                <FormGroup controlId="formInlineName" >
                    <ControlLabel>Name</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Search patient" readOnly="readonly" name="Name" value={this.state.Name}/>
                </FormGroup>{' '}
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl
                        type="email" 
                        name="Email" 
                        placeholder="username@example.com" 
                        value={this.state.Email} 
                        onChange={this.handleChange} />
                </FormGroup>{' '}

                {this.state.Patient !== null ? <span>
                        <Button onClick={() => { this.handleAction("editPatient") }} bsStyle="info"> <MdEdit /></Button>  &nbsp;
                        <Button onClick={() => { this.handleAction("deletePatient") }} bsStyle="danger" > <MdDelete /></Button> </span>
                    : null}
            </Form>

            </div>
    }
}
export default EditPatient