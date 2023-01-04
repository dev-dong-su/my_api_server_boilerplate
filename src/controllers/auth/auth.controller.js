const { compare } = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models/User.model');
const { createToken } = require('../../utils/jwt.config');
const { verifyToken } = require('../../utils/protected');
const { response } = require('../../utils/response');
const { securePassword } = require('../../utils/securePassword');
const { MESSAGE } = require('../../utils/errorMessage');

// register new account
const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const oldUser = await User.findOne({
      email,
    });
    if (oldUser) {
      return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, MESSAGE.EMAIL_ALREADY_EXIST);
    }

    const hashedPassword = await securePassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      userType: 'user',
      activeStatus: true,
      name,
    });

    if (!user) {
      return response(res, StatusCodes.FORBIDDEN, false, {}, MESSAGE.AUTHENTICATION_ERROR);
    }

    return response(res, StatusCodes.ACCEPTED, true, { user }, null);
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.COMPLEAT_FORMAT);
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return response(res, StatusCodes.NOT_FOUND, false, {}, MESSAGE.EMAIL_NOT_FOUND);
    }
    const matched = await compare(password, user.password);
    if (matched) {
      if (user.activeStatus) {
        const token = await createToken(user);
        if (token) {
          return response(res, StatusCodes.OK, true, { token }, null);
        }

        return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.BAD_REQUEST);
      }
      return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, MESSAGE.USER_NOT_ACTIVATED);
    }
    return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, MESSAGE.LOGIN_FAILD);
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

// Re-Login
const reAuth = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.TOKEN_NOT_FOUND);
  }

  try {
    const result = await verifyToken(token.split('Bearer ')[1]);
    if (result) {
      const user = await User.findById(result._id);

      if (!user || !user.activeStatus) {
        return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.AUTHENTICATION_ERROR);
      }

      const newToken = await createToken(user);

      if (newToken) {
        return response(res, StatusCodes.OK, true, { token: newToken }, null);
      }
    } else {
      return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.RE_LOGIN);
    }
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

module.exports = {
  register,
  login,
  reAuth,
};
