const deleteTicket = (id) => {
  return `delete from reqdatabase where id=${id}`;
};

const getRequestTicket = async (req, res, next) => {
  
};

const addToQueue = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2
  // when the barber accept
  deleteTicket(req.body.id);
};
const addToQueueManual = async (req, res, next) => {
  
};
const removeTheRequest = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2

  deleteTicket(req.body.id);
};

module.exports = {
  getRequestTicket,
  addToQueue,
  removeTheRequest,
  addToQueueManual,
};
