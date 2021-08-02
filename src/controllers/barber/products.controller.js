const Interface = require('../../Models/serv-prod-Interface');
const interfaceSql = new Interface('products');

const createProduct = async (req, res, next) => {
  // create a Product, description and price

  // id serial PRIMARY KEY,
  // barber_id int NOT NULL,
  //   product_name varchar(255) NOT NULL,
  //   description varchar(255),
  //   price int NOT NULL,
  //   discount int default 0,
  //   end_date date,
  //   product_image varchar(255)
  try {
      
    const {barberId, productName, productDescrp, productPrice, discount, endDate, productImg } =
      req.body;
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
  // we need the barber id
  // get all products for the barbar
  try {
    const { barberID } = req.body;
    const { productID } = req.params;

    let productResponse = await interfaceSql.read(barberID, productID);
    res.send(productResponse);
  } catch (error) {
    res.json(error);
  }
};

const editProduct = async (req, res, next) => {
  // update a product
  try {
    const { productID } = req.params;

    const {
      barberId,
      productName,
      productDescrp,
      productPrice,
      discount,
      endDate,
    } = req.body;
    let productDataUpdated = {
      productName,
      productDescrp,
      productPrice,
      discount,
      endDate,
    };
    let productResponse = await interfaceSql.update(
      barberId,
      productID,
      productDataUpdated,
    );
    res.send(productResponse);
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res, next) => {
  // delete a product
  try {
    const { barberId } = req.body;
    const { productID } = req.params;

    let productResponse = await interfaceSql.delete(barberId, productID);
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
