import express from "express";
import apicache from "apicache";
import { register } from "../controllers/auth.js";
const cache = apicache.middleware;

const router = express.Router();

router.post("/register", register);

export { router as authRouter };
