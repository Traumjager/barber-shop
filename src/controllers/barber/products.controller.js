const Interface = require('../../Models/Interface');
const interfaceSql = new Interface('servicesTable');

const createProduct = async (req, res, next) => {
  // create a Product, description and price
  const { productName, productDescrp, productPrice } = req.body;
  let productData = {
    productName,
    productDescrp,
    productPrice,
  };
  let productResponse = await interfaceSql.create(productData);
  res.send('all good');
};
const getProduct = async (req, res, next) => {
  const { barberID } = req.body;
  const { productID } = req.params;

  // we need the barber id
  // get all products for the barbar
  let productResponse = interfaceSql.read(barberID, productID);
};

const editProduct = async (req, res, next) => {
  // update a product
};

const deleteProduct = async (req, res, next) => {
  // delete a product
};
module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
