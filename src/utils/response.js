const { getReasonPhrase } = require('http-status-codes');

const response = async (res, code, status, data, message) => {
  let msg = message;
  if (!msg) {
    msg = getReasonPhrase(code);
  }
  return res.status(code).json({
    status,
    data,
    msg,
  });
};

module.exports = { response };
