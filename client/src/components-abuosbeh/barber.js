import React, { Component } from 'react';
import axios from 'axios';

class Barber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queues: [],
      ticket: [],
      id: 5,
    };
    this.ticketData = {
      id: this.state.id,
      barbarId: 4,
      serviseId: 11,
      clientId: 1,
      time: '2004-10-19 10:23:54 ',
    };
    this.serviceData = {
      id: 10,
      barberID: 4,
      serviceName: 'hair cut',
      serviceDescrp: 'pla pla pla',
      servicePrice: 30,
      estimatedTime: '30 min',
      discount: 10,
    };
    this.productsData = {
      id: 10,
      barberID: 4,
      productName: 'علبة جل بل أم الليرة',
      productDescrp: 'pla pla pla',
      productPrice: 30,
      discount: 10,
    };
  }
  componentDidMount() {
    this.props.socket.emit('join', this.props.socket.id);

    this.props.socket.on('recieveTicket', (recieveTicket) => {
      this.setState({
        ticket: [...this.state.ticket, recieveTicket],
      });
      console.log('this.state.ticket', this.state.ticket);
    });
    this.props.socket.on('recieveSubs', (subsMsg) => {
      alert(subsMsg);
    });
    this.props.socket.on('recieveReview', (reviewMsg) => {
      alert(reviewMsg);
    });

    this.getAllTickets();
  }
  getAllTickets = async () => {
    let serviceResponse = await axios.get(`http://localhost:${process.env.REACT_APP_PORT}/barber/requests/${this.ticketData.barbarId}/0`);
    console.log('serviceResponse', serviceResponse);

    this.setState({
      ticket: serviceResponse.data,
    });
    // console.log('this.state.ticket', this.state.ticket);
  };
  acceptTicket = async () => {
    let serviceResponse = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/barber/queue`, this.ticketData);
    // console.log('serviceResponse', serviceResponse);
    this.props.socket.emit('addQueue', ` this ticket accetpted ${this.ticketData.clientId}`);
  };
  declineTicket = async () => {
    let serviceResponse = await axios.delete(`http://localhost:${process.env.REACT_APP_PORT}/barber/requests/${this.ticketData.id}`);
    // console.log('serviceResponse', serviceResponse);
    this.props.socket.emit('addQueue', ` this ticket declined ${this.ticketData.clientId}`);
  };

  createService = async () => {
    let serviceResponse = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/barber/services`, this.serviceData);
    // console.log('serviceResponse', serviceResponse);
    if (this.serviceData.discount) {
      this.props.socket.emit('addServiceOffer', ` this service has this discount ${this.serviceData.discount}`);
    }
  };
  createProduct = async () => {
    let serviceResponse = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/barber/products`, this.productsData);
    // console.log('serviceResponse', serviceResponse);
    if (this.productsData.discount) {
      this.props.socket.emit('addProductOffer', ` this product has this discount ${this.productsData.discount}`);
    }
  };
  updateService = async () => {
    let serviceResponse = await axios.put(`http://localhost:${process.env.REACT_APP_PORT}/barber/services/${this.serviceData.id}`, this.serviceData);
    // console.log('serviceResponse', serviceResponse);
    if (this.serviceData.discount) {
      this.props.socket.emit('addServiceOffer', ` this service has this discount ${this.serviceData.discount}`);
    }
  };
  updateProduct = async () => {
    let serviceResponse = await axios.put(`http://localhost:${process.env.REACT_APP_PORT}/barber/products/${this.productsData.id}`, this.serviceData);
    // console.log('serviceResponse', serviceResponse);
    if (this.productsData.discount) {
      this.props.socket.emit('addProductOffer', ` this product has this discount ${this.productsData.discount}`);
    }
  };
  render() {
    return (
      <>
        <h1>Barber Page</h1>

        <h1>{this.state.ticket.length}</h1>
        <button onClick={this.acceptTicket}>Accept TICKET</button>
        <button onClick={this.declineTicket}>Decline TICKET</button>
        <br></br>
        <button onClick={this.createService}>CREATE SERVICE</button>
        <button onClick={this.updateService}>UPDAT SERVICE</button>
        <br></br>
        <button onClick={this.createProduct}>CREATE PRODUCT</button>
        <button onClick={this.updateProduct}>UPDAT PRODUCT</button>
      </>
    );
  }
}
export default Barber;
