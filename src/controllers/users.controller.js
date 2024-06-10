import {
  createAndUpdateUserValidation,
  otpValidation,
  loginValidation,
} from "../validations/users.validation.js";
import {
  registerService,
  otpService,
  loginService,
} from "../services/users.service.js";

export const registerController = async (req, res) => {
  try {
    const { body } = req;

    const { ok, statuss, messages, value } =
      await createAndUpdateUserValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await registerService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const verifyController = async (req, res) => {
  try {
    const { body } = req;

    const { ok, statuss, messages, value } = await otpValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await otpService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const loginController = async (req, res) => {
  try {
    const { body } = req;

    const { ok, statuss, messages, value } = await loginValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await loginService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};
