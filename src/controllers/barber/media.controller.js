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
    await media.delete(req);
    const path = `${process.cwd()}/src${req.body.path}`;
    fs.unlink(path, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });

    res.json('the image been deleted');
  } catch (error) {
    res.json(error);
  }
};

const deleteVideos = async (req, res, next) => {
  try {
    await media.delete(req);
    const path = `${process.cwd()}/src${req.body.videoPath}`;
    fs.unlink(path, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });

    res.json('the video has been deleted');
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
