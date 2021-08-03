'use strict';
const Interface = require('../../Models/auth-model');
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
  try {
    const id = req.params.id ? req.params.id : next('Need an ID to update');
    const client = await userC.update(id, req);
    res.status(200).json(client);
  } catch (error) {
    res.status(403).json(error.message);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const password = req.body.password ? req.body.password : next('WRONG password');
    await userC.delete(password);
    res.status(204).send('see you later');
  } catch (e) {
    res.status(403).json(e.message);
  }
};

module.exports = {
  getClients,
  updateClients,
  deleteClient,
};
