'use strict';
const Interface = require('../../Models/serv-prod-interface');
const interfaceSql = new Interface('services');

const getServices = async (req, res, next) => {
  // get one or all services for one or all barbers from DB

  try {
    let serviceResponse;
    // const { barberID } = req.body;
    const { barberID } = req.params;
    const { serviceID } = req.params;

    if (serviceID != '0') {
      console.log('serviceID,barberID', serviceID, barberID);
      //get one service for one barber
      serviceResponse = await interfaceSql.read(serviceID, false);
    } else if (barberID != '0') {
      //get all services for one barber
      serviceResponse = await interfaceSql.read(false, barberID);
    } else {
      //get all services for all barbers
      serviceResponse = await interfaceSql.read(false, false);
    }
    res.send(serviceResponse);
  } catch (error) {
    res.json(error);
  }
};
const createServices = async (req, res, next) => {
  // create your services and prices
  console.log('req.body', req.body);
  try {
    const { barberID, serviceName, serviceDescrp, servicePrice, estimatedTime, discount, endDate } = req.body;
    let serviceData = {
      barberID,
      serviceName,
      serviceDescrp,
      servicePrice,
      estimatedTime,
      discount,
      endDate,
    };
    let serviceResponse = await interfaceSql.create(serviceData);
    res.send(serviceResponse);
  } catch (error) {
    res.json(error.message);
  }
};

const editServices = async (req, res, next) => {
  // update the service
  try {
    const { serviceID } = req.params;

    

    const { serviceName, serviceDescrp, servicePrice, estimatedTime, discount, endDate } = req.body;
    let serviceDataUpdated = {
      serviceName,
      serviceDescrp,
      servicePrice,
      estimatedTime,
      discount,
      endDate,
    };

    let serviceResponse = await interfaceSql.update(serviceID, serviceDataUpdated);
    res.send(serviceResponse);
  } catch (error) {
    res.json(error);
  }
};

const deleteServices = async (req, res, next) => {
  // delete the service
  try {
    let serviceResponse;
    const { serviceID } = req.params;
    const { barberID } = req.params;

    //delete one service for one barber
    if (serviceID != '0') {
      serviceResponse = await interfaceSql.delete(serviceID, false);
    } else if (barberID) {
      //delete all services for this barber
      serviceResponse = await interfaceSql.delete(false, barberID);
    }

    res.send(serviceResponse);
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  getServices,
  createServices,
  editServices,
  deleteServices,
};
