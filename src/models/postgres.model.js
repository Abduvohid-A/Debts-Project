import pool from "../config/database.js";

export const createTable = async () => {
  try {
    const users = `CREATE TABLE IF NOT EXISTS users (
            id SERIAL ,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
            password VARCHAR(150) NOT NULL,
            status VARCHAR(40) NOT NULL DEFAULT FALSE
        )`;

    const otp = `CREATE TABLE IF NOT EXISTS otps (
            email VARCHAR(100) UNIQUE NOT NULL,
            otp VARCHAR(100) NOT NULL,
            FOREIGN KEY (email) REFERENCES users(email) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        )`;

    const type = `CREATE TYPE types AS ENUM ('new', 'paid', 'cancelled')`;

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
    await pool.query(users);
    await pool.query(otp);
    try {
      await pool.query(type);
    } catch (enumError) {
      if (enumError.code === "42710") {
        // console.log('Type "types" already exists, skipping creation.');
      } else {
        throw enumError;
      }
    }

    await pool.query(debts);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
