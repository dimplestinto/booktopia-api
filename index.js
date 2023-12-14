import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import limiter from "./libs/rate-limiter.js";
import { authRouter } from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static("public"));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
	console.log(`⚡️ Server is running on port ${PORT}`);
});
