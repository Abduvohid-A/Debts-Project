registerController, verifyController, loginController;

export const registerController = async (req, res) => {
  try {
    const { body } = req;

    const { ok, statuss, messages, value } =
      await createAndUpdateUserValidation(body);

    if (!ok) return res.status(statuss).send(messages);

    const { status, message } = await registerService(value);

    registerController.status(status).send(message);
  } catch (error) {

  }
};
