'use strict';
const Interface = require('../../Models/auth-interface');
const userC = new Interface('client');

const getClients = async (req, res, next) => {
  const id = req.params.id ? req.params.id : null;
  try {
    const data = await userC.get(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateClients = async (req, res, next) => {
  const id = req.params.id ? req.params.id : next('Need an ID to update');
  try {
    const client = await userC.update(id, req.body);
    res.status(200).json(client);
  } catch (error) {
    res.status(403).json(error.message);
  }
};

const deleteClient = async (req, res, next) => {
  // dlete a client accout
};

module.exports = {
  getClients,
  updateClients,
  deleteClient,
};
