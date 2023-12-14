import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import limiter from "./libs/rate-limiter.js";
import { authRouter } from "./routes/auth.js";
import morgan from "morgan";

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
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use("/api/v1/auth", authRouter);

try {
	(async () => {
		await mongoose.connect(process.env.MONGODB_URI).then(() => {
			console.log(`🚀 Connected to MongoDB  `);
		});
	})();
} catch (err) {
	console.log(err);
	throw new Error("Error connecting to db", err);
}

app.listen(PORT, () => {
	console.log(`⚡️ Server is running on port ${PORT}`);
});
