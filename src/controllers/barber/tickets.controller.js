const Interface = require('../../Models/ticket-interface');

const ticket = new Interface('tickets');

const getRequestTicket = async (req, res, next) => {
  const data = await ticket.read(req.params);
  res.json(data);
};

const addToQueue = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2
  // when the barber accept
};
const addToQueueManual = async (req, res, next) => {};
const removeTheRequest = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2
};

module.exports = {
  getRequestTicket,
  addToQueue,
  removeTheRequest,
  addToQueueManual,
};
