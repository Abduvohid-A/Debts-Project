import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import pool from "../config/database.js";
import configuration from "../config/configuration.js";
import { sendOtp } from "../utils/nodemailer.js";
import { createToken } from "../utils/jsonwebtoken.js";

export const registerService = async (user) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (result.rows.length > 0) {
      return { status: 400, message: "User already exists" };
    }
    const { BCRYPT_SALT } = configuration.salt;

    const generateOtp = await otpGenerator.generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
    });

    const isSend = await sendOtp(user.email, generateOtp);

    if (!isSend) {
      return { status: 400, message: "Otp jo'natilmadi" };
    }

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(BCRYPT_SALT)
    );

    const insert = `INSERT INTO users (username, email, password, role ) VALUES ($1, $2, $3, $4)`;

    await pool.query(insert, [
      user.username,
      user.email,
      hashedPassword,
      user.role,
    ]);

    await pool.query(`INSERT INTO otps (email, otp) values ($1, $2)`, [
      user.email,
      generateOtp,
    ]);

    return { status: 201, message: "User successfully created" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Internal server error" };
  }
};

export const otpService = async (user) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);

    const otpResult = await pool.query(
      "SELECT otp FROM otps WHERE email = $1",
      [user.email]
    );
    const otp = otpResult.rows.length > 0 ? otpResult.rows[0].otp : null;

    if (result.rows.length === 0 || otp === null) {
      return { status: 400, message: "User not found" };
    }

    if (otp !== user.otp) {
      return { status: 400, message: "Incorrect OTP" };
    }

    await pool.query("UPDATE users SET status = $1 WHERE email = $2", [
      true,
      user.email,
    ]);

    await pool.query("DELETE FROM otps WHERE email = $1", [user.email]);

    return { status: 200, message: "Correct One Time Password" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};

export const loginService = async (user) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (!result.rows.length === 1) {
      return { status: 400, message: "Invalid Email", token: "" };
    }

    const decode = await bcrypt.compare(user.password, result.rows[0].password);

    if (!decode) {
      return { status: 400, message: "Invalid Password", token: "" };
    }

    const { ACCESS_KEY, ACCESS_TIME, REFRESH_KEY, REFRESH_TIME } =
      configuration.jwt;

    const accessToken = createToken(
      {
        email: result.rows[0].email,
        role: result.rows[0].role,
      },
      ACCESS_KEY,
      { expiresIn: ACCESS_TIME }
    );
    const refreshToken = createToken(
      {
        email: result.rows[0].email,
        role: result.rows[0].role,
      },
      REFRESH_KEY,
      { expiresIn: REFRESH_TIME }
    );

    if (!accessToken || !refreshToken) {
      return { status: 400, message: "Token Failed", token: "" };
    }

    await pool.query(
      `INSERT INTO refreshToken (email, refresh) VALUES ($1, $2)`,
      [result.rows[0].email, refreshToken]
    );

    return { status: 200, message: "", token: { accessToken, refreshToken } };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Internal server error", token: "" };
  }
};
