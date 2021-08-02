'use strict';
const Interface = require('../../Models/Interface');
const interfaceSql = new Interface('servicesTable');
const addServices = async (re, res, next) => {
  // add a service from services list to service board
};

const createServices = async (req, res, next) => {
  // create your services and prices
  console.log('req.body', req.body);
  const { serviceName, serviceDescrp, servicePrice, estimatedTime } = req.body;
  let sreviceData = {
    serviceName,
    serviceDescrp,
    servicePrice,
    estimatedTime,
  };
  let serviceResponse = interfaceSql.create(sreviceData);
  res.send('all good');
};

const editServices = async (req, res, next) => {
  // update the server
  const {
    barberId,
    seviceID,
    serviceName,
    serviceDescrp,
    servicePrice,
    estimatedTime,
  } = req.body;
  let sreviceDataUpdated = {
    serviceName,
    serviceDescrp,
    servicePrice,
    estimatedTime,
  };
  let serviceResponse = interfaceSql.update(
    barberId,
    seviceID,
    sreviceDataUpdated
  );
  res.send('updat done');
};

const deleteServices = async (req, res, next) => {
  // update the server
  const { barberId, seviceID } = req.body;
  let serviceResponse = interfaceSql.delete(barberId, seviceID);
  res.send('delete done');
};
module.exports = {
  createServices,
  editServices,
  deleteServices,
  addServices,
};
