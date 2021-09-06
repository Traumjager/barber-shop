const Interface = require('../../Models/serv-prod-interface');
const interfaceSql = new Interface('products');

const createProduct = async (req, res, next) => {
  // create a Product, description and price
  try {
    console.log('req.body', req.body);
    console.log('req.file', req.file);

    const path = req.file.path.substring(3);

    const { barberID, productName, productDescrp, productPrice, discount, endDate, productImg } = req.body;
    let productData = {
      barberID,
      productName,
      productDescrp,
      productPrice,
      discount,
      endDate,
      productImg: path,
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
    if (productID != '0') {
      //get one product for one barber
      productResponse = await interfaceSql.read(productID, false);
    } else if (barberID != '0') {
      //get all products for one barber
      productResponse = await interfaceSql.read(false, barberID);
    } else {
      //get all products for all barbers
      // console.log("else");
      productResponse = await interfaceSql.read(false, false);
    }
    res.send(productResponse.rows);
  } catch (error) {
    res.json(error);
  }
};

const editProduct = async (req, res, next) => {
  const path = req.file.path.substring(3);

  // update a product
  try {
    const { productID } = req.params;

    const { productName, productDescrp, productPrice, discount, endDate, productImg } = req.body;
    let productDataUpdated = {
      productName,
      productDescrp,
      productPrice,
      discount,
      endDate,
      productImg: path,
    };

    console.log('productDataUpdated', productDataUpdated);
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
    const { barberID } = req.params;
    const { productID } = req.params;

    //delete one product for one barber
    if (productID != '0') {
      productResponse = await interfaceSql.delete(productID, false);
    } else if (barberID) {
      //delete all products for this barber
      productResponse = await interfaceSql.delete(false, barberID);
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
