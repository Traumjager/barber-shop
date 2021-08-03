const interFace = require('../../Models/sub-interface');
const getSubscribers = async (req, res, next) => {
  const { barberId } = req.params;
  const subscriptions = await interFace.read(barberId);
  res.json(subscriptions.rows[0]);
};
module.exports = getSubscribers;
