import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// Use express to create the router and assign to variable 'router'
const router = express.Router();

// Get the information
router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
