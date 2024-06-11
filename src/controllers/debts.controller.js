createDebtController,
  getAllDebtsController,
  updateDebtController,
  deleteDebtController;

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
    const { status, message } = await registerService(value);

    res.status(status).send(message);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server errror");
  }
};

export const updateDebtController = async (req, res) => {
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

export const deleteDebtController = async (req, res) => {
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
