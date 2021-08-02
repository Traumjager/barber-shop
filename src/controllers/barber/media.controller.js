const fs = require('fs');

const pool = require('../../Models/pool');

const addPhotos = async (req, res, next) => {
  const sql = `INSERT INTO media (barber_id,media_type,media_path) VALUES ($1,$2,$3) RETURNING *;`;
  try {
    req.files.forEach(async (file) => {
      const path = `/images/cuts/${file.filename}`;
      await pool.query(sql, [req.body.id, 'image', path]);
    });

    res.json('path save to the database');
  } catch (error) {
    res.json(error);
  }
};

const addVideos = async (req, res, next) => {
  // save videos to database
  const sql = `INSERT INTO media (barber_id,media_type,media_path) VALUES ($1,$2,$3) RETURNING *;`;
  try {
    req.files.forEach(async (file) => {
      const path = `/videos/${file.filename}`;
      await pool.query(sql, [req.body.id, 'video', path]);
    });

    res.json('path save to the database');
  } catch (error) {
    res.json(error);
  }
};

const deletePhotos = async (req, res, next) => {

  
  try {
    await pool.query(`DELETE FROM media WHERE id=$1 RETURNING *;`, [
      req.body.id,
    ]);
    const path = `${process.cwd()}/src${req.body.imgPath}`;
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
    await pool.query(`DELETE FROM media WHERE id=$1 RETURNING *;`, [
      req.body.id,
    ]);
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
  const {id}= req.body;
  try {
    if (id) {
      const sql = `SELECT * FROM media WHERE barber_id=$1;`;
      const data = await pool.query(sql,[id]);
      return res.json(data);
    } else {
      
      return res.json('you cant accses this data');
    }
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
