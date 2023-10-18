import express from "express";
import { test } from "../controllers/user.controller.js";

// Use express to create the router and assign to variable 'router'
const router = express.Router();

// Get the information
router.get("/test", test);

export default router;
