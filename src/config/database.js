import mongoose from "mongoose";
import pg from "pg";
const { Pool } = pg;
import configuration from "./configuration.js";

const { POSTGRES_URI, MONGODB_URI } = configuration.database;

export const connectMongoDB = async () => {
  try {
    const con = await mongoose.connect(MONGODB_URI);
    console.log(`Mongo DB connected on host : ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const pool = new Pool({
  connectionString: POSTGRES_URI,
});

export const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    console.log(`Postgres connected on host : ${client.host}`);
    client.release();
  } catch (error) {
    console.error("Postgres connection error:", error);
    process.exit(1);
  }
};

export default pool;
