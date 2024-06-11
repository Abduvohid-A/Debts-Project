import pool from "../config/database.js";

export const createDebtService = async (debt) => {
  try {
    const result = await pool.query(
      `INSERT INTO debts (amount, description, debtor_email, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        debt.amount,
        debt.description,
        debt.debtor_email,
        debt.due_date,
        debt.status,
      ]
    );

    if (!result) {
      return { status: 400, message: "Bad request" };
    }

    return {
      status: 201,
      message: "Debt successfully created",
    };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Bad request" };
  }
};

export const getAllDebtsService = async (email) => {
  try {
    console.log(email);
    const result = await pool.query(
      "SELECT * FROM debts WHERE debtor_email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return {
        status: 404,
        message: "No debts found",
        values: "",
      };
    }

    return {
      status: 200,
      message: "",
      values: result.rows,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error", values: "" };
  }
};

export const updateDebtService = async (id, value) => {
  try {
    const result = await pool.query("SELECT * FROM debts WHERE id = $1", [id]);

    if (result.rows.length !== 1) {
      return { status: 404, message: "Not Found" };
    }

    const debt = result.rows[0];
    const { amount, description, debtor_email, due_date, status } = value;

    await pool.query(
      `UPDATE debts SET amount = $1, description = $2, debtor_email = $3, due_date = $4, status = $5 where id = $6`,
      [amount, description, debtor_email, due_date, status, debt.id]
    );

    return { status: 200, message: "successfully updated" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};

export const deleteDebtService = async (id) => {
  try {
    const debt = await pool.query(`SELECT * FROM debts WHERE id = $1`, [id]);

    if (debt.rows.length !== 1) {
      return { status: 404, message: "Not Found" };
    }
    await pool.query("DELETE FROM debts WHERE id = $1", [id]);

    return { status: 200, message: "SECCESSFULLY DELETED" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};
