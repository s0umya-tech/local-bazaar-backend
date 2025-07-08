// Standard response utility

const sendResponse = (res, status, message, data = null, httpCode = 200) => {
    const response = {
      status: status.toUpperCase(), // "SUCCESS" or "ERROR"
      message,
    };
  
    if (status.toUpperCase() === "SUCCESS" && data !== null) {
      response.data = data;
    }
  
    return res.status(httpCode).json(response);
  };
  
  module.exports = sendResponse;
  