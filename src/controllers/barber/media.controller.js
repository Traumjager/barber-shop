const fs = require('fs');

const InterFace = require('../../Models/media-interface');

const media = new InterFace('media');

const addPhotos = async (req, res, next) => {
  try {
    const data = await media.createImges(req);
    if(!data){
      res.send('uploaded field');
    }
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const addVideos = async (req, res, next) => {
  // save videos to database
  try {
    const data = await media.createVideos(req);

    if(!data){
      res.send('uploaded field');
    }
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

const deletePhotos = async (req, res, next) => {
  try {
    
    const path = `${process.cwd()}/src${req.body.path}`;
    fs.unlink(path, async err => {
      if (err) return  res.json('this image is already deleted');
      await media.delete(req.params);
      res.json('image deleted');
    });

  } catch (error) {
    res.json(error);
  }
};

const deleteVideos = async (req, res, next) => {
  try {
    
    const path = `${process.cwd()}/src${req.body.path}`;
    fs.unlink(path, async err => {
      if (err) return  res.json('this video is already deleted');
      await media.delete(req.params);
      res.json('video deleted');
    });

  } catch (error) {
    res.json(error);
  }
};

const getAllMedia = async (req, res, next) => {
  try {
    const data = await media.read(req);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAllMedia,
  addPhotos,
  addVideos,
  deletePhotos,
  deleteVideos,
};
