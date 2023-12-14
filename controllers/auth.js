import pkg from "mongoose";
import { User } from "../models/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { MongoClient, ObjectId } = pkg;

const mongoClient = async () => {
	const client = await MongoClient.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

const register = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	try {
		if (!first_name || !last_name || !email || !password) {
			return res.status(400).json({ message: "Please provide all fields" });
		}

		const user = await User.findOne({ email }, { $maxTimeMs: 10000 });

		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			first_name,
			last_name,
			email,
			password: hash,
		});

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("token", token, { httpOnly: true });

		const payload = {
			user: newUser,
			token,
		};

		res.status(201).json({ payload, message: "User successfully created" });
	} catch (err) {
		throw new Error("Server error", err);
	}
};

export { register };
