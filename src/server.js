'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const intServerErr = require('./error-handler/500');
const notFound = require('./error-handler/404');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(http);
io.listen(server);
let room;
io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('join', (socketID) => {
    socket.join(socketID);
    room = socketID;
    console.log('socketID', socketID);
  });
  socket.on('ticket', (ticketMsg) => {
    console.log('ticketMsg', ticketMsg);
    console.log('socket', socket.id);
    io.in(room).emit('recieveTicket', ticketMsg);
  });

  socket.on('addQueue', (queueMsg) => {
    console.log('queueMsg', queueMsg);
    io.in(room).emit('recieveQueue', queueMsg);
  });
  socket.on('subscribe', (subsMsg) => {
    console.log('subsMsg', subsMsg);
    io.in(room).emit('recieveSubs', subsMsg);
  });
  socket.on('addServiceOffer', (serviceOfferMsg) => {
    console.log('serviceOfferMsg', serviceOfferMsg);
    io.in(room).emit('recieveServiceOffer', serviceOfferMsg);
  });

  socket.on('addProductOffer', (productOfferMsg) => {
    console.log('productOfferMsg', productOfferMsg);
    io.in(room).emit('recieveProductOffer', productOfferMsg);
  });
  socket.on('review', (reviewMsg) => {
    console.log('reviewMsg', reviewMsg);
    io.in(room).emit('recieveReview', reviewMsg);
  });
  socket.on('disconnect', () => {
    console.log('disconnect client');
  });
});

// routers

const barberRoutes = require('./routes/barber.route');
const clientRouters = require('./routes/client.route');
const authRoutes = require('./routes/auth.route');

app.get('/', (req, res) => {
  res.send('A dream you dream alone is only a dream. A dream we dream together is reality');
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(`/`, authRoutes);
app.use(`/client`, clientRouters);
app.use('/barber', barberRoutes);
app.use('/images', express.static(__dirname + '/images'));
app.use('/videos', express.static(__dirname + '/videos'));

app.use('*', notFound);
app.use(intServerErr);
module.exports = {
  app,
  start: (port) => {
    server.listen(port, () => {
      console.log(`server works at port ${port}`);
    });
  },
};
