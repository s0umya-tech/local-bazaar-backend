const jwt = require("jsonwebtoken");

// Global JWT check
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({status:"ERROR", message: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "localbazaar-secret");
    req.user = decoded; // Contains userId, role
    next();
  } catch (err) {
    return res.status(401).json({status:"ERROR", message: "Invalid or expired token" });
  }
};

// Role-based protection
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({status:"ERROR", message: "Admins only" });
  next();
};

const isShopkeeper = (req, res, next) => {
  if (req.user?.role !== "shopkeeper") return res.status(403).json({ status:"ERROR",message: "Shopkeepers only" });
  next();
};

const isCustomer = (req, res, next) => {
  if (req.user?.role !== "customer") return res.status(403).json({ status:"ERROR",message: "Customers only" });
  next();
};

// Generic RBAC middleware
const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({status:"ERROR", message: `Access denied for role: ${req.user?.role}` });
  }
  next();
};

module.exports = {
  authMiddleware,
  isAdmin,
  isShopkeeper,
  isCustomer,
  allowRoles
};
