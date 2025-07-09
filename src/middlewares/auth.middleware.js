const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/sendResponse");

const openRoutes = [
  { method: "POST", path: "/auth/send-otp" },
  { method: "POST", path: "/auth/verify-otp" },
  { method: "GET", path: "/products" },
  { method: "GET", path: /^\/products\/shop\/.+/ },
  { method: "GET", path: "/categories" }
];

const authMiddleware = (req, res, next) => {
  const isPublic = openRoutes.some(route => {
    if (route.method !== req.method) return false;
    if (typeof route.path === "string") return req.path === route.path;
    if (route.path instanceof RegExp) return route.path.test(req.path);
    return false;
  });

  if (isPublic) return next();

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return sendResponse(res, "ERROR", "Access token required", null, 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains userId and role
    next();
  } catch (err) {
    return sendResponse(res, "ERROR", "Invalid token", null, 403);
  }
};

module.exports = authMiddleware;
