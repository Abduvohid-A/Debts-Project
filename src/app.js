import express from "express";
import { connectMongoDB, connectPostgres } from "./config/database.js";
import { createTable } from "./models/postgres.model.js";
// import mainRouter from "./routes/index.routes.js";

export const app = express();
connectMongoDB();
connectPostgres();
createTable();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", mainRouter);


