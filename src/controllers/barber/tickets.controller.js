const Interface = require('../../Models/ticket-interface');

const ticket = new Interface('tickets');

const getRequestTicket = async (req, res, next) => {
  const { barberID, clientID } = req.params;
  let data;
  if (barberID != '0') {
    data = await ticket.read(barberID, false);
  } else if (clientID) {
    data = await ticket.read(false, clientID);
  }
  res.json(data.rows);
};

const addToQueue = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2
  // when the barber accept

  const queue = new Interface('queue');

  const addedQueue = await queue.create(req.body);
  
  const deletedTicket = await ticket.deletee(req.body);

  res.json({ addedQueue, deletedTicket });
};




const addToQueueManual = async (req, res, next) => {
  const data = await ticket.create(req.body);

  res.json(data);
};
const removeTheRequest = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2
  console.log(req.params.id);

  const data = await ticket.delete(req.params);

  res.json(data);
};

module.exports = {
  getRequestTicket,
  addToQueue,
  removeTheRequest,
  addToQueueManual,
};
