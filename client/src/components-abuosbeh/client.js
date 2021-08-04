import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ticketData = {
      barbarId: 4,
      serviseId: 11,
      clientId: 1,
      time: '2/8/2021 - 7:30 ',
    };
    this.subs = {
      barberId: 4,
      clientId: 1,
    };
    this.review = {
      barberId: 4,
      clientId: 1,
      description: 'ammoura is a good barber and hatem not',
      rate: 5,
    };
  }
  componentDidMount() {
    this.props.socket.emit('join', this.props.socket.id);
    this.props.socket.on('recieveQueue', (queueMsg) => {
      alert(queueMsg);
    });
    this.props.socket.on('recieveServiceOffer', (serviceOfferMsg) => {
      alert(serviceOfferMsg);
    });
    this.props.socket.on('recieveProductOffer', (productOfferMsg) => {
      alert(productOfferMsg);
    });
  }
  createTicket = async () => {
    let serviceResponse = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/client/tickets`, this.ticketData);
    // console.log('serviceResponse', serviceResponse);
    this.props.socket.emit('ticket', ` this ticket from this id${this.ticketData.clientId}`);
  };
  subscribeBarber = async () => {
    let serviceResponse = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/client/subs`, this.subs);
    console.log('serviceResponse', serviceResponse);
    this.props.socket.emit('subscribe', ` this client ${this.subs.clientId} start following this barber ${this.subs.barberId}`);
  };
  addReview = async () => {
    let serviceResponse = await axios.post(`http://localhost:${process.env.REACT_APP_PORT}/client/reviews`, this.review);
    console.log('serviceResponse', serviceResponse);
    this.props.socket.emit(
      'review',
      ` this client ${this.review.clientId} review this barber ${this.review.barberId} :
    ${this.review.description}`
    );
  };

  render() {
    return (
      <>
        <h1>CLient Page</h1>
        <button onClick={this.createTicket}>CRETE TICKET</button>
        <button onClick={this.subscribeBarber}>SUBSICRIBE BARBER</button>
        <br></br>
        <button onClick={this.addReview}>ADD REVIEW</button>
      </>
    );
  }
}
export default Client;
