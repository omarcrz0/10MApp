import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
import { PatientHandle } from "./components/PatientHandle"
import { Timed10Form } from "./components/Timed10Form"
import { PatientRecord } from "./components/PatientRecord"


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={PatientHandle} />
        <Route path='/Timed10Form' component={Timed10Form} />
        <Route path='/PatientRecord' component={PatientRecord} />

      </Layout>
    );
  }
}
