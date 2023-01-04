const joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { response } = require('../../utils/response');

const validation = joi.object({
  name: joi.string().max(100).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(6).trim(true).required(),
  userType: joi.string().valid('admin', 'user').required(),
});

const userValidation = async (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
  };
  const { error } = validation.validate(data);
  if (error) {
    const msg = `Error in User Data : ${error.message}`;
    return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
  }
  next();
};
module.exports = { userValidation };
