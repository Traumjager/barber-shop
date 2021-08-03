'use strict';

const Interface = require('../../Models/ticket-interface');

const ticket = new Interface('tickets');

const createTicket = async (req, res, next) => {
  // create a ticket to be sent to a certain barber

  const data = await ticket.create(req.body);

  res.json(data);
};

const deleteTicket = async (req, res, next) => {
  // delete a ticket

  // const data = await ticket.delete(req.body);
  console.log('sssss');
  // res.json(data);

};

const updateTicket = async (req, res, next) => {
  // delete a ticket
  // const data = await ticket.update(req.body);
  console.log('dddddddddddddd');
  
};

module.exports = {
  createTicket,
  deleteTicket,
  updateTicket,
};
