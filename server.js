const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { authMiddleware } = require("./middlewares/auth.middleware");
const routes = require("./routes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Apply JWT middleware to all /api routes EXCEPT login, register, product list
app.use("/api", (req, res, next) => {
  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/products", // GET /api/products
  ];
  const isPublic = publicPaths.some(path => req.path.startsWith(path));
  if (isPublic && req.method === "GET" || req.path === "/auth/login" || req.path === "/auth/register") {
    return next(); // skip auth
  }
  authMiddleware(req, res, next); // apply JWT check
});

app.use("/api", routes);

app.listen(5000, () => console.log("🚀 Server started on port 5000"));
