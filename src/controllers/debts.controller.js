import {
  createDebtService,
  getAllDebtsService,
  updateDebtService,
  deleteDebtService,
} from "../services/debts.service.js";
import { createAndUpdateDebtValidation } from "../validations/debt.validation.js";

export const createDebtController = async (req, res) => {
  try {
    const { body } = req;

    const { ok, statuss, messages, value } =
      await createAndUpdateDebtValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await createDebtService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const getAllDebtsController = async (req, res) => {
  try {
    const { status, message } = await getAllDebtsService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const updateDebtController = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const { ok, statuss, messages, value } =
      await createAndUpdateDebtValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await updateDebtService(id, value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const deleteDebtController = async (req, res) => {
  try {
    const { body } = req;

    const { status, message } = await deleteDebtService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};
