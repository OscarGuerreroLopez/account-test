import express from "express";
import cors from "cors";
import helmet from "helmet";

import * as middleware from "./http/middleware";
import Router from "./http/router";
import { EnvVars, Logger } from "./utils";
import { Database, LoadMethods, AddAdminUser, AddUsers } from "./infra/repo";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true, origin: true }));
app.use(helmet());

app.use(middleware.LoggerMiddleware);
app.use("/", Router);
app.use("*", middleware.NotFoundMiddleware);

app.use(middleware.errorMiddleware);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("uncaughtException", (e: any) => {
  Logger.error(e.message || "uncaughtException", {
    message: "uncaughtException",
    error: {
      message: e.message || "no error message",
      stack: e.stack || "no stack"
    }
  });

  Logger.on("finish", () => process.exit(1));

  setTimeout(() => {
    Logger.end();
  }, 2000);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (e: any) => {
  Logger.error(e.message || "unhandledRejection", {
    message: "unhandledRejection",
    error: {
      message: e.message || "no error message",
      stack: e.stack || "no stack"
    }
  });

  Logger.on("finish", () => process.exit(1));

  setTimeout(() => {
    Logger.end();
  }, 2000);
});

app.listen(EnvVars.PORT, async () => {
  await Database.createConnection();
  await LoadMethods();
  await AddAdminUser();
  await AddUsers();
  Logger.info(`Server is running on http://localhost:${EnvVars.PORT}...`);
});
