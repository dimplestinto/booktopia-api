import rateLimit from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 1000,
	max: 5,
	legacyHeaders: false,
});

export default limiter;
