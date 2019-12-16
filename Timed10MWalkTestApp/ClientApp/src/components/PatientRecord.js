import React, { Component } from 'react'
import './PatientStyling.css';
import Timed10MRun from './Timed10MRun';
import { Table } from "react-bootstrap"
import PatientInfo from "./PatientInfo"
import { Alert, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export class PatientRecord extends Component {


    constructor(props) {
        super()
        this.state = {

            //Buffer containing the selected Patient
            Patient: null,

            //Basic kit for searching for a patient
            patientName: "",
            displayPatients: [],
            focusName: false,

            //State containing all the Test runs for a patient
            TestRuns: null
        }


        this.handleChange = this.handleChange.bind(this)

        this.searchPatient = this.searchPatient.bind(this)
        this.focusSearchName = this.focusSearchName.bind(this)
        this.selectUser = this.selectUser.bind(this)

    }

    //Update state to get patient information
    selectUser(patient) {
        this.setState({
            patientName: patient.name,
            focusName: false,
        })

        const data = {
            Name: patient.name,
            Email: patient.email,
            Gender: patient.gender,
            Id: patient.id
        }
        const url = "/api/Timed10MTest/PatientTestRuns";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),

            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            //If we sucessfully get Test runs for a patient, display them
            .then(response => response.length > 0 ?
                this.setState({
                    TestRuns: response.map(r => <Timed10MRun key={r.testID} data={r}/> ) 
                })
               : null

            ); //fetch bracket

    }

    //Function to add div showing search options (function triggers when search box gets focus) 
    focusSearchName(event) {
        //const { name, value } = event.target
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
                [name]: value,
            })//set state bracket
        }//else bracket
    }

    //Function to update states with new input in elements
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }

    render() {

        return <div>


            <FormGroup className='search-patient'>
                <ControlLabel style={{ fontSize: 20 }}>Search Patient</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter name" bsSize='lg' name="patientName" value={this.state.patientName} onChange={this.searchPatient}
                    onFocus={this.focusSearchName} />
                <HelpBlock> Select a patient from the list </HelpBlock>
                {this.state.focusName ? <div style={{ maxHeight: 300, overflowY: 'scroll' }}> {this.state.displayPatients} </div> : null}
            </FormGroup>{' '}

            <br/>
            <br/>

            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Run #1 (s) </th>
                        <th>Run #2 (s)</th>
                        <th>Run #3 (s)</th>
                        <th>Average (s)</th>
                        <th>Run velocity (m/s) </th>
                        <th>Run Speed</th>
                        <th>Assistive Device</th>
                        <th>Notes</th>
                    </tr>   
                </thead>
                <tbody>
                    {this.state.TestRuns}
                </tbody>
            </Table>
            <div> 
                    
            </div>
        </div>
    }

}

export default PatientRecord