import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "./config/env.js";
import { router } from "./routes.js";
import { HttpError } from "./common/http-error.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [env.APP_URL],
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(pinoHttp);

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/v1", router);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: "Unexpected error" });
  });

  return app;
}
