//This file contain the common API responses
const Success = (res, data = {}, message, code) => {
  return res
    .status(code)
    .json({ status: "Success", code: code, message: message, response: data });
};

const Error = (res, message, code) => {
  return res.status(code).json({
    status: "Error",
    code: code,
    message: message,
  });
};

module.exports = { Success, Error };
