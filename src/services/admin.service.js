import pool from "../config/database.js";

export const deleteUserService = async (id) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!user.rows) {
      return { status: 400, message: "Bad Request" };
    }

    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    return { status: 200, message: "SUCCESSFULLY DELETED" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};

export const updateUserService = async (id, users) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (!user.rows) {
      return { status: 400, message: "Bad Request", values: "" };
    }
    const { username, email, password, role } = users;

    await pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5",
      [username, email, password, role, id]
    );

    return { status: 200, message: "SUCCESSFULLY UPDATED" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};

export const getAllUsersService = async (user) => {
  try {
    const users = await pool.query("SELECT * FROM users");

    if (!users.rows) {
      return { status: 400, message: "Bad Request", values: "" };
    }

    return { status: 200, message: "", values: users.rows };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};
