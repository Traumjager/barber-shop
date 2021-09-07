'use strict';

const interFace = require('../../Models/sub-interface');

const addBarber = async (req, res, next) => {
  // subscribe a barber
  const { barberId, clientId } = req.body;
  const addSubscription = await interFace.create(barberId, clientId);
  res.json(addSubscription.rows[0]);
};

const removeBarber = async (req, res, next) => {
  // remove subscription from a barber
  const { barberId, clientId } = req.params;
  const deleteSubscription = await interFace.delete(barberId, clientId);
  res.json(deleteSubscription.rows[0]);
};

module.exports = {
  addBarber,
  removeBarber,
};
