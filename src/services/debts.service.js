import pool from "../config/database.js";

export const createDebtService = async (user) => {
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

export const getAllDebtsService = async (user) => {
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

export const updateDebtService = async (user) => {
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

export const deleteDebtService = async (user) => {
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
