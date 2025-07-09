const sendResponse = (res, status, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    status,
    message,
    data
  });
};

module.exports = sendResponse;
