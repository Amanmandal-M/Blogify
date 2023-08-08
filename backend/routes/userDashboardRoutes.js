const express = require("express");
const userDashboardRouter = express.Router();
const userDashboardController = require("../controllers/userDashboardController");

// Protected route, accessible only to authenticated users
userDashboardRouter.get("/", userDashboardController.getUserDashboard);

module.exports = userDashboardRouter;
