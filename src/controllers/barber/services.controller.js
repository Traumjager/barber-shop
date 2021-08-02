'use strict';
const Interface = require('../../Models/Interface');
const interfaceSql = new Interface('services');
const addServices = async (re, res, next) => {
  // add a service from services list to service board
};

const createServices = async (req, res, next) => {
  // create your services and prices
  console.log('req.body', req.body);
  try {
    const {
      barberId,
      serviceName,
      serviceDescrp,
      servicePrice,
      estimatedTime,
      discount,
      endDate,
    } = req.body;
    let sreviceData = {
      barberId,
      serviceName,
      serviceDescrp,
      servicePrice,
      estimatedTime,
      discount,
      endDate,
    };
    let serviceResponse = await interfaceSql.create(sreviceData);
    res.send(serviceResponse);
  } catch (error) {
    res.json(error);
  }
};

const editServices = async (req, res, next) => {
  // update the service
  try {
    const { seviceID } = req.params;

    const {
      barberId,
      serviceName,
      serviceDescrp,
      servicePrice,
      estimatedTime,
      discount,
      endDate,
    } = req.body;
    let sreviceDataUpdated = {
      serviceName,
      serviceDescrp,
      servicePrice,
      estimatedTime,
      discount,
      endDate,
    };
    let serviceResponse = await interfaceSql.update(
      barberId,
      seviceID,
      sreviceDataUpdated
    );
    res.send(serviceResponse);
  } catch (error) {
    res.json(error);
  }
};

const deleteServices = async (req, res, next) => {
  // delete the service
  try {
    const { barberId } = req.body;
    const { seviceID } = req.params;

    let serviceResponse = await interfaceSql.delete(barberId, seviceID);
    res.send(serviceResponse);
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createServices,
  editServices,
  deleteServices,
  addServices,
};
