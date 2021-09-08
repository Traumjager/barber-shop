const multer = require('multer');
const randomNumber = Math.floor(Math.random() * 1000) + 1;
const profileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './src/images/profilePics');
  },
  filename: (req, file, callBack) => {
    let id = req.body.id || req.params.id;
    id?id:id=randomNumber;
    callBack(null, '--' + id + '--' +file.originalname);
  },
});

const cutsStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './src/images/cuts');
  },
  filename: (req, file, callBack) => {
    
    callBack(null, '--' + Date.now() + '--' + file.originalname);
  },
});

const videoStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './src/videos');
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + file.originalname);
  },
});

const productStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './src/images/products');
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + file.originalname);
  },
});

const uploadProfilepic = multer({ storage: profileStorage });
const uploadProduct = multer({ storage: productStorage });
const uploadcuts = multer({ storage: cutsStorage });
const uploadvideo = multer({ storage: videoStorage });

module.exports = {
  uploadcuts,
  uploadvideo,
  uploadProfilepic,
  uploadProduct,
};
