import express from "express";
import apicache from "apicache";
import { register } from "../controllers/auth.js";
const cache = apicache.middleware;

const router = express.Router();

router.post("/register", register);
router.get("/", async (_, res) => {
	return res.send("Hello world");
});

export { router as authRouter };
