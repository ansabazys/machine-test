import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";

import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT_URL!,
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
  });
});

app.use("/api", routes);

export default app;