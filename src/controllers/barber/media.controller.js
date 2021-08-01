const fs = require('fs');

const addPhotos = async (req, res, next) => {
  // save imges to database
  // console.log('body',req.body);
  // console.log('img',req.files);

  const path = `/images/cuts/${req.files[0].filename}`;

  // console.log(path);

  return res.json(path);
};

const addVideos = async (req, res, next) => {
  // save videos to database
  console.log('body',req.body);
  console.log('videos',req.files);

  return res.json('nody and the video succses');
};

const deletePhotos = async (req, res, next) => {
  // save imges to database
  
  
};

const deleteVideos = async (req, res, next) => {
  // save videos to database
};

module.exports = {
  addPhotos,
  addVideos,
  deletePhotos,
  deleteVideos,
};
