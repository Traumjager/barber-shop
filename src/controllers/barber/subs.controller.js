const interFace = require('../../Models/sub-interface');
const getSubscribers = async (req, res, next) => {
  
  const { barberid,clientid } = req.params;
  const subscriptions = await interFace.read(barberid,clientid);
  res.json(subscriptions);
};
module.exports = getSubscribers;
