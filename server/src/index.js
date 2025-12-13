import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// JSON body parser
app.use(express.json({ limit: "50kb" }));

// CORS (only allow your frontend)
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Rate limit contact endpoint (anti-spam)
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 8, // max 8 requests per window per IP
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// health check
app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/contact", contactLimiter, contactRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
