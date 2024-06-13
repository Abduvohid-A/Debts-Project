import express from "express";
import { connectMongoDB, connectPostgres } from "./config/database.js";
import { createTable } from "./models/postgres.model.js";
import mainRouter from "./routes/index.routes.js";
import { logMiddleware } from "./middlewares/logs.js";

export const app = express();
connectMongoDB();
connectPostgres();
createTable();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.use("/api", mainRouter);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  shutdown();
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  shutdown();
});
