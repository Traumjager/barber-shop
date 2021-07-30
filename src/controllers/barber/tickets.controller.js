const deleteTicket = (id) => {
  return `delete from reqdatabase where id=${id}`;
};



const getRequestTicket = async (req, res, next) => {
  // get all the tickets that in hold
};

const addToQueue = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2
  // when the barber accept
  deleteTicket(req.body.id);
};
const addToQueueManule = async (req, res, next) => {
 

};
const removeTheRuqest = async (req, res, next) => {
  // after you accept or ignore use the delete function in line 2

  deleteTicket(req.body.id);
};

module.exports = {
  getRequestTicket,
  addToQueue,
  removeTheRuqest,
  addToQueueManule,
};

