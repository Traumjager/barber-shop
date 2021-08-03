'use strict';

const Interface = require('../../Models/ticket-interface');

const ticket = new Interface('tickets');

const createTicket = async (req, res, next) => {
  // create a ticket to be sent to a certain barber

  const data = await ticket.create(req.body);

  res.json(data.rows);
};

const deleteTicket = async (req, res, next) => {
  // delete a ticket

  console.log(req.params.id);

  const data = await ticket.delete(req.params);

  res.json(data);
};

const updateTicket = async (req, res, next) => {
  // delete a ticket
  const data = await ticket.update(req.body);

  res.json(data);
};

module.exports = {
  createTicket,
  deleteTicket,
  updateTicket,
};
