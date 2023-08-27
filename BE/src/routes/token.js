import express from "express";
import { checkToken } from "../controllers/jwt-service.js";
const router = express.Router();

// Token Authentication
router.get("/verify-token/:token", checkToken);

export default router;
