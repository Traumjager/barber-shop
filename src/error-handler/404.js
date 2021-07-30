 
module.exports = (err, req, res, next) => {
  const error = err.message ? err.message : err;
  res.status(404).json({ error });
};