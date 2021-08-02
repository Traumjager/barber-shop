import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: '',
      serviceDescrp: '',
      servicePrice: 0,
      estimatedTime: 0,
    };
  }

  //addService
  addService = async (e) => {
    e.preventDefault();

    let sreviceData = {
      serviceName: this.state.serviceName,
      serviceDescrp: this.state.serviceDescrp,
      servicePrice: this.state.servicePrice,
      estimatedTime: this.state.estimatedTime,
    };

    let serviceResponse = await axios.post(
      `http://localhost:${process.env.PORT}/barber/services/`,
      sreviceData
    );
    console.log('serviceResponse from front-end', serviceResponse);
  };

  //   onChangeServiceName
  onChangeServiceName = (e) => {
    this.setState({
      serviceName: e.target.value,
    });
  };

  //   onChangeServiceDescrp
  onChangeServiceDescrp = (e) => {
    this.setState({
      serviceDescrp: e.target.value,
    });
  };

  //   onChangeServicePrice
  onChangeServicePrice = (e) => {
    this.setState({
      servicePrice: e.target.value,
    });
  };

  //   onChangeTime
  onChangeTime = (e) => {
    this.setState({
      estimatedTime: e.target.value,
    });
  };

  render() {
    return (
      <>
        <h1>Services Component</h1>
        <form onSubmit={this.addService}>
          <label>Service name</label>
          <input type='text' onChange={this.onChangeServiceName}></input>
          <br />
          <label>Service description</label>
          <input type='text' onChange={this.onChangeServiceDescrp}></input>
          <br />
          <label>Service price</label>
          <input type='number' onChange={this.onChangeServicePrice}></input>
          <br />
          <label>Estimated time</label>
          <input type='text' onChange={this.onChangeTime}></input>
          <br />
          <input type='submit' value='add service'></input>
        </form>
      </>
    );
  }
}

export default Services;
