import React, { Component } from "react"
import { Button } from "react-bootstrap"

export class Timed10MRun extends Component {

    constructor() {
        super()
        this.state = {

        }

    }

    render() {
        console.log(this);
        const dt = new Date(this.props.data.date);

        const year = dt.getFullYear();
        const day = dt.getDate()
        const month = dt.getMonth() + 1;
        return <tr>
            <td>{month}/{day}/{year}</td>
            <td> {this.props.data.runS1}</td>
            <td> {this.props.data.runS2}</td>
            <td> {this.props.data.runS3}</td>
            <td> {this.props.data.averageTimePerRun.toFixed(3)}</td>
            <td> {this.props.data.averageVelocity.toFixed(3)}</td>
            <td> {this.props.data.testSpeed}</td>
            <td> {this.props.data.assistiveDevice}</td>
            <td> {this.props.data.notes} </td>
            

        </tr>


    }
}


export default Timed10MRun

