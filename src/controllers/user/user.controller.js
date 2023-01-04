const { StatusCodes } = require('http-status-codes');
const { response } = require('../../utils/response');
const { User } = require('../../models/User.model');
const { securePassword } = require('../../utils/securePassword');
const { MESSAGE } = require('../../utils/errorMessage');

const createUser = async (req, res) => {
  const { name, email, password, photo, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.COMPLEAT_FORMAT);
  }

  try {
    const oldUser = await User.findOne({
      email,
    });
    if (oldUser) {
      return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, MESSAGE.EMAIL_ALREADY_EXIST);
    }
    if (password.length < 8) {
      return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, MESSAGE.PASSWORD_ERROR);
    }

    const hashedPassword = await securePassword(req.body.password);

    const user = await User.create({
      email,
      password: hashedPassword,
      userType,
      activeStatus: true,
      name,
      photo,
    });

    if (!user) {
      return response(res, StatusCodes.FORBIDDEN, false, {}, MESSAGE.AUTHENTICATION_ERROR);
    }

    return response(res, StatusCodes.ACCEPTED, true, { user }, null);
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

// Get Users
const getUsers = async (req, res) => {
  const { skip, limit, activeStatus, searchKey, sortBy } = req.body;

  try {
    const usersCount = await User.countDocuments()
      .where(
        searchKey
          ? {
              $or: [
                {
                  name: { $regex: searchKey, $options: 'i' },
                },
                {
                  email: { $regex: searchKey, $options: 'i' },
                },
                {
                  mobile: { $regex: searchKey, $options: 'i' },
                },
              ],
            }
          : null,
      )
      .where(activeStatus !== undefined ? { activeStatus } : null);

    const users = await User.find()
      .select('name email userType activeStatus photo')
      .where(
        searchKey
          ? {
              $or: [
                {
                  name: { $regex: searchKey, $options: 'i' },
                },
                {
                  email: { $regex: searchKey, $options: 'i' },
                },
                {
                  mobile: { $regex: searchKey, $options: 'i' },
                },
              ],
            }
          : null,
      )
      .where(activeStatus !== undefined ? { activeStatus } : null)
      .sort(sortBy ? { [sortBy.field]: [sortBy.order] } : { createdAt: -1 })
      .limit(limit || null)
      .skip(skip || null);

    if (!users || users.length === 0) {
      return response(res, StatusCodes.NOT_FOUND, false, {}, MESSAGE.USER_NOT_FOUND);
    }

    return response(res, StatusCodes.OK, true, { usersCount, users }, null);
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

// Get User Details
const getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('name email activeStatus userType photo');
    if (!user) {
      return response(res, StatusCodes.NOT_FOUND, false, {}, MESSAGE.USER_NOT_FOUND);
    }

    return response(res, StatusCodes.OK, true, { user }, null);
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

// Update User Dtails
const updateUserDetails = async (req, res) => {
  const { name, mobile, photo } = req.body;

  const { id } = req.params;

  const user = {};

  if (name) {
    user.name = name;
  }
  if (mobile) {
    user.mobile = mobile;
  }
  if (photo) {
    user.photo = photo;
  }

  if (user) {
    user.updatedAt = new Date();
    try {
      const newUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      }).exec();
      if (!newUser) {
        return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.BAD_REQUEST);
      }

      return response(res, StatusCodes.ACCEPTED, true, { user: newUser }, null);
    } catch (error) {
      return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
    }
  } else {
    return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.BAD_REQUEST);
  }
};

// Update Status
const updateStatus = async (req, res) => {
  const { activeStatus, userType } = req.body;

  const { id } = req.params;

  const user = {};

  if (activeStatus !== undefined) {
    user.activeStatus = activeStatus;
  }

  if (userType) {
    user.userType = userType;
  }

  if (user) {
    user.updatedAt = new Date();
    try {
      const newUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      }).exec();
      if (!newUser) {
        return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.BAD_REQUEST);
      }

      return response(res, StatusCodes.ACCEPTED, true, { user: newUser }, null);
    } catch (error) {
      return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
    }
  } else {
    return response(res, StatusCodes.BAD_REQUEST, false, {}, MESSAGE.BAD_REQUEST);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return response(res, StatusCodes.NOT_FOUND, false, {}, MESSAGE.USER_NOT_FOUND);
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return response(res, StatusCodes.BAD_REQUEST, false, {}, '삭제 실패');
    }

    return response(res, StatusCodes.ACCEPTED, true, { user }, null);
  } catch (error) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, {}, error.message);
  }
};

module.exports = {
  getUsers,
  getUserDetails,
  updateUserDetails,
  updateStatus,
  deleteUser,
  createUser,
};
