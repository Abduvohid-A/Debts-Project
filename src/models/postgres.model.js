import pool from "../config/database.js";

export const createTable = async () => {
  try {
    const users = `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            role role_type NOT NULL DEFAULT 'user',
            status BOOLEAN NOT NULL DEFAULT FALSE
        )`;

    const otp = `CREATE TABLE IF NOT EXISTS otps (
            email VARCHAR(100) UNIQUE NOT NULL,
            otp VARCHAR(100) NOT NULL
        )`;

    const type = `CREATE TYPE types AS ENUM ('new', 'paid', 'cancelled')`;
    const role_type = `CREATE TYPE role_type AS ENUM ('user', 'admin')`;

    const debts = `CREATE TABLE IF NOT EXISTS debts (
            id SERIAL PRIMARY KEY,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(200) NOT NULL,
            debtor_email VARCHAR(100) UNIQUE NOT NULL,
            due_date DATE NOT NULL,
            status types NOT NULL,
            FOREIGN KEY (debtor_email) REFERENCES users(email)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        )`;

    try {
      await pool.query(type);
    } catch (enumError) {
      if (enumError.code === "42710") {
      } else {
        throw enumError;
      }
    }

    try {
      await pool.query(role_type);
    } catch (enumError) {
      if (enumError.code === "42710") {
      } else {
        throw enumError;
      }
    }

    await pool.query(users);
    await pool.query(otp);
    await pool.query(debts);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
