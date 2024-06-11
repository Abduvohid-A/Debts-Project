import {
  deleteUserService,
  updateUserService,
  getAllUsersService,
} from "../services/admin.service.js";
import { createAndUpdateUserValidation } from "../validations/users.validation.js";

export const getAllUsersController = async (req, res) => {
  try {
    const { status, message, values } = await getAllUsersService();

    if (values) return res.status(status).json(values);

    return res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const { ok, statuss, messages, value } =
      await createAndUpdateUserValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await updateUserService(id, value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, message } = await deleteUserService(id);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};
