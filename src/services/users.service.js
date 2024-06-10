import pool from "../config/database.js";
import bcrypt from "bcrypt";
import configuration from "../config/configuration.js";
import { sendOtp } from "../utils/nodemailer.js";

export const registerService = async (user) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (result.rows.length > 0) {
      return { status: 400, message: "User already exists" };
    }
    const { BCRYPT_SALT } = configuration.salt;
    const { NODEMAILER_PORT, NODEMAILER_EMAIL, NODEMAILER_PASS } =
      configuration.nodemailer;

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(BCRYPT_SALT)
    );

    const insert = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;

    await pool.query(insert, [user.username, user.email, hashedPassword]);

    return { status: 201, message: "User successfully created" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Internal server error" };
  }
};

export const otpService = async (user) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (result.rows.length > 0) {
      return { status: 400, message: "User already exists" };
    }
    const { BCRYPT_SALT } = configuration.salt;

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(BCRYPT_SALT)
    );

    const insert = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;

    await pool.query(insert, [user.username, user.email, hashedPassword]);

    return { status: 201, message: "User successfully created" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Internal server error" };
  }
};

export const loginService = async (user) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (result.rows.length > 0) {
      return { status: 400, message: "User already exists" };
    }
    const { BCRYPT_SALT } = configuration.salt;

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(BCRYPT_SALT)
    );

    const insert = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;

    await pool.query(insert, [user.username, user.email, hashedPassword]);

    return { status: 201, message: "User successfully created" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Internal server error" };
  }
};
