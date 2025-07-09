const sendResponse = require("../utils/sendResponse");

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendResponse(res, "ERROR", "Forbidden: Access denied", null, 403);
    }
    next();
  };
};

module.exports = allowRoles;
