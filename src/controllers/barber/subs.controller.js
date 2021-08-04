const interFace = require('../../Models/sub-interface');
const getSubscribers = async (req, res, next) => {
  
  const { id } = req.params;
  const subscriptions = await interFace.read(id);
  res.json(subscriptions.rows);
};
module.exports = getSubscribers;
