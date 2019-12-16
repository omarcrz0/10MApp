import React, { Component } from "react"
import { Alert } from "react-bootstrap"
import { IoMdPerson } from "react-icons/io"
import { FaAddressCard, FaGenderless } from "react-icons/fa"
import { MdEmail } from "react-icons/md";

export class PatientInfo extends Component {

    

    render() {
        return < Alert
            className="patient-alert"
            onClick={this.props.clickUser}
        >
            <IoMdPerson /> {this.props.patient.name} <br />
            <FaAddressCard /> {this.props.patient.id} <br />
            <FaGenderless /> {this.props.patient.gender} <br />
            <MdEmail  /> {this.props.patient.email} <br />
        </Alert >
       
    } 
}

export default PatientInfo


