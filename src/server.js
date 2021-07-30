'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const intServerErr = require('./error-handler/500');
const notFound = require('./error-handler/404');

// routers

// const barberRoutes = require('./routes/barber.route');
// const clientRouters = require('./routes/client.route');
const authRoutes = require('./routes/auth.route');


app.get('/', (req, res) => {
  res.send('ya theeb yalle tali allel 3oooet');
});

app.use(cors());
app.use(express.json());
app.use('*', notFound);
app.use(intServerErr);
app.use(`/`, authRoutes);
// app.use(`/client`, clientRouters);
// app.use('/barber', barberRoutes);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`server works at port ${port}`);
    });
  },
};