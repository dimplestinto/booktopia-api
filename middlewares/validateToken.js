import { User } from "../models/model";

export const validateToken = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ message: "You need to Login" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;

		next();
	} catch (err) {
		throw new Error("Invalid token", err);
	}
};
