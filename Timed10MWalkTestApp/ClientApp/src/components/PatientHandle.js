import React, { Component } from 'react';
//import {  } from 'react-bootstrap';
import './PatientStyling.css';
import NewPatient from "./NewPatient"
import EditPatient from "./EditPatient"



export class PatientHandle extends Component {
    render() {


        return <div>
            <br />
            <br />
            <NewPatient />
            <br />
            <br />
            <EditPatient />
        </div>
    }
}


