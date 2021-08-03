const AuthModel = require('../Models/auth-interface');

const verifyUser = async (req, res, next) => {
    const { email, role, verificationToken } = req.body;
    const AuthModel = new AuthModel(role);
    const result = await AuthModel.verify(email,);




}