'use strict';
const Interface = require('../../Models/auth-model');
const userB = new Interface('barber');

const getBarbers = async (req, res, next) => {
  const id = req.params.id ? req.params.id : null;
  try {
    const data = await userB.get(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateBarber = async (req, res, next) => {
  const id = req.params.id ? req.params.id : next('Need an ID to update');
  try {
    const barber = await userB.update(id, req);
    res.status(200).json(barber);
  } catch (error) {
    res.status(403).json(error.message);
  }
};

const deleteBerber = async (req, res, next) => {
  try {
    const password = req.body.password ? req.body.password : next('WRONG password');
    await userB.delete(password);
    res.status(204).send('see you later');
  } catch (e) {
    res.status(403).json(e.message);
  }
};

module.exports = {
  getBarbers,
  updateBarber,
  deleteBerber,
};
