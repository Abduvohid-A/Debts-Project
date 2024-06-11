import {
  deleteUserService,
  updateUserService,
  getAllUsersService,
} from "../services/admin.service.js";
import { createAndUpdateUserValidation } from "../validations/users.validation.js";

export const getAllUsersController = async (req, res) => {
  try {
    const { status, message } = await getAllUsersService();

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { body } = req;

    const { ok, statuss, messages, value } =
      await createAndUpdateUserValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await updateUserService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { body } = req;

    const { status, message } = await deleteUserService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};
