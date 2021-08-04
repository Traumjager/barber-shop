import './App.css';
import Services from '../src/components-abuosbeh/services';
import Client from '../src/components-abuosbeh/client';
import Barber from '../src/components-abuosbeh/barber';
import io from 'socket.io-client';
import React, { Component } from 'react';
// let socket;

const socket = io(`localhost:${process.env.REACT_APP_PORT}/`, {
  transports: ['websocket'],
});
class App extends Component {
  componentDidMount() {
    socket.on('connect', () => {
      console.log('connected from front end');
    });
  }
  render() {
    return (
      <>
        <Client socket={socket}></Client>
        <Barber socket={socket}></Barber>
      </>
    );
  }
}

export default App;
