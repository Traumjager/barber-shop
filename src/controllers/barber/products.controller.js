const Interface = require('../../Models/serv-prod-Interface');
const interfaceSql = new Interface('products');

const createProduct = async (req, res, next) => {
  // create a Product, description and price
  try {
    const { barberId, productName, productDescrp, productPrice, discount, endDate, productImg } = req.body;
    let productData = {
      barberId,
      productName,
      productDescrp,
      productPrice,
      discount,
      endDate,
      productImg,
    };
    let productResponse = await interfaceSql.create(productData);
    res.send(productResponse);
  } catch (error) {
    res.json(error);
  }
};
const getProduct = async (req, res, next) => {
  // get one or all products for one or all barbers from DB

  try {
    let productResponse;
    // const { barberID } = req.body;
    const { barberID } = req.params;
    const { productID } = req.params;
    if (productID) {
      //get one product for one barber
      productResponse = await interfaceSql.read(productID, false);
    } else if (barberID) {
      //get all products for one barber
      productResponse = await interfaceSql.read(false, barberID);
    } else {
      //get all products for all barbers
      productResponse = await interfaceSql.read(false, false);
    }
    res.send(productResponse);
  } catch (error) {
    res.json(error);
  }
};

const editProduct = async (req, res, next) => {
  // update a product
  try {
    const { productID } = req.params;

    const { productName, productDescrp, productPrice, discount, endDate } = req.body;
    let productDataUpdated = {
      productName,
      productDescrp,
      productPrice,
      discount,
      endDate,
    };
    let productResponse = await interfaceSql.update(productID, productDataUpdated);
    res.send(productResponse);
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res, next) => {
  // delete a product
  try {
    let productResponse;
    const { barberId } = req.params;
    const { productID } = req.params;

    //delete one product for one barber
    if (productID) {
      productResponse = await interfaceSql.delete(productID, false);
    } else if (barberId) {
      //delete all products for this barber
      productResponse = await interfaceSql.delete(false, barberId);
    }

    res.send(productResponse);
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
