'use strict';
const AuthModel = require('../Models/auth-model');

const verifyUser = async (req, res, next) => {
  try {
    const { email, role, verificationToken } = req.body;
    const user = new AuthModel(role);
    const result = await user.isVerified(email, verificationToken);
    if (result.rowCount) {
      next();
      return result.rows[0];
    } else {
      throw new Error('wrong code');
    }
  } catch (err) {
    res.status(403).json(err.message);
  }
};
module.exports = verifyUser;
